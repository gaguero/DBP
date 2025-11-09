import { NextResponse } from "next/server";
import { env } from "@/lib/env";

/**
 * API Route para recibir eventos de GA4 y enviarlos a Measurement Protocol
 * 
 * Uso desde frontend:
 * fetch('/api/ga4-event', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     event: 'page_view',
 *     params: { page_path: '/rooms', user_email: 'user@example.com' },
 *     user_email: 'user@example.com'
 *   })
 * })
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, params, user_email } = body;

    // Verificar configuración de GA4
    const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    const GA4_API_SECRET = process.env.GA4_API_SECRET;

    if (!GA4_MEASUREMENT_ID || !GA4_API_SECRET) {
      console.warn("GA4 not configured - event not sent");
      return NextResponse.json({ 
        success: false, 
        error: "GA4 not configured" 
      }, { status: 500 });
    }

    // Preparar payload para GA4 Measurement Protocol
    const clientId = user_email || params?.user_email || 'anonymous';
    
    const ga4Payload = {
      client_id: clientId,
      events: [
        {
          name: event,
          params: {
            ...params,
            timestamp_micros: Date.now() * 1000,
          },
        },
      ],
    };

    // Enviar a GA4 Measurement Protocol
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?api_secret=${GA4_API_SECRET}&measurement_id=${GA4_MEASUREMENT_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ga4Payload),
      }
    );

    if (!response.ok) {
      console.error("GA4 event failed", response.status, await response.text());
      return NextResponse.json({ 
        success: false, 
        error: "Failed to send event to GA4" 
      }, { status: 500 });
    }

    // También enviar a n8n webhook si está configurado (para actualizar EspoCRM)
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
    if (N8N_WEBHOOK_URL && user_email) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: clientId,
            events: [
              {
                name: event,
                params: {
                  ...params,
                  user_email: user_email,
                  timestamp_msec: Date.now(),
                },
              },
            ],
          }),
        });
      } catch (n8nError) {
        // No fallar si n8n no está disponible
        console.warn("n8n webhook failed (non-critical):", n8nError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GA4 event error", error);
    return NextResponse.json({ 
      success: false, 
      error: "Internal error" 
    }, { status: 500 });
  }
}

