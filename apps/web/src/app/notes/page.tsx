"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/card";
import { FAQNotesEditor } from "@/components/faq-notes-editor";
import { faqs } from "@/content/data";

export default function NotesPage() {
  const [generalNotes, setGeneralNotes] = useState("");
  const storageKey = "site-notes-general";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setGeneralNotes(saved);
    }
  }, []);

  useEffect(() => {
    if (generalNotes) {
      localStorage.setItem(storageKey, generalNotes);
    }
  }, [generalNotes]);

  return (
    <div className="min-h-screen bg-[var(--color-sand)] py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-[var(--color-navy)] mb-4 text-center">
            Site Content Confirmation Checklist
          </h1>
          <p className="text-center text-[var(--color-text-muted)] max-w-2xl mx-auto">
            This page lists all information that needs to be confirmed and replaced with accurate property-specific details before the site goes live.
          </p>
        </div>

        {/* General Notes Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">📝 General Notes & Comments</h2>
          <textarea
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            className="w-full min-h-[150px] p-4 text-sm border border-[var(--color-sand)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-ocean)] resize-y"
            placeholder="Add any general notes, comments, or reminders here..."
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Notes are saved automatically to your browser
          </p>
        </Card>

        {/* FAQ Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">❓ FAQ Content</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            All FAQ answers currently contain placeholder text. Each FAQ needs to be replaced with actual property information.
          </p>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[var(--color-sand)] pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-[var(--color-navy)] mb-3">{faq.question}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">Items to confirm:</p>
                <ul className="space-y-1 mb-4">
                  {faq.answerItems?.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-gold)] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <FAQNotesEditor faqIndex={idx} initialNotes={faq.notes || ""} />
              </div>
            ))}
          </div>
        </Card>

        {/* Travel & Logistics Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">✈️ Travel & Logistics</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Best Travel Times by Season</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">
                Current dates listed: Dry Season (December - April), Green Season (May - November)
              </p>
              <p className="text-xs text-yellow-700 font-medium">
                ⚠️ NEEDS CONFIRMATION: Please verify these season dates and descriptions are accurate for Bocas del Toro
              </p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Transfer Prices</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Transfer prices are in a modal on the Contact page. Prices can be updated in <code className="bg-gray-100 px-1 rounded">transfer-prices-modal.tsx</code>
              </p>
            </div>
          </div>
        </Card>

        {/* Property Details Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">🏨 Property Details</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Room Information</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">
                Room descriptions, sizes, and amenities are in <code className="bg-gray-100 px-1 rounded">data.ts</code>
              </p>
              <p className="text-xs text-yellow-700 font-medium">
                ⚠️ NEEDS REVIEW: Verify all room details, sizes, and amenities are accurate
              </p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Activities & Pricing</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">
                Activity descriptions and pricing are in <code className="bg-gray-100 px-1 rounded">data.ts</code>
              </p>
              <p className="text-xs text-yellow-700 font-medium">
                ⚠️ NEEDS REVIEW: Verify all activity descriptions, durations, pricing, and included items are current and accurate
              </p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Dining Information</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">
                Dining schedule and highlights are in <code className="bg-gray-100 px-1 rounded">data.ts</code>
              </p>
              <p className="text-xs text-yellow-700 font-medium">
                ⚠️ NEEDS REVIEW: Verify meal times, menu descriptions, and dining details are accurate
              </p>
            </div>
          </div>
        </Card>

        {/* Sustainability Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">🌱 Sustainability & Impact</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Impact Metrics</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">
                Conservation hours and community partnerships metrics are displayed on the Sustainability page
              </p>
              <p className="text-xs text-yellow-700 font-medium">
                ⚠️ NEEDS DOCUMENTATION: Calculation methods, activities included, partner list, and criteria need to be documented
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Information Section */}
        <Card className="p-6 mb-8">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">📞 Contact Information</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Contact Methods</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                ✓ WhatsApp: +507 6346 0605<br />
                ✓ Email: contact@dolphinblueparadise.com<br />
                ✓ Phone: +507 6346 0605
              </p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-semibold text-[var(--color-navy)] mb-2">Physical Address</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                ✓ Isla San Cristóbal - Bahia Delfines - Bocas del Toro - Panama
              </p>
            </div>
          </div>
        </Card>

        {/* Priority Items */}
        <Card className="p-6 bg-yellow-50 border-2 border-yellow-400">
          <h2 className="font-display text-2xl text-[var(--color-navy)] mb-4">🚨 Priority Items</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold text-xl">1.</span>
              <div>
                <p className="font-semibold text-[var(--color-navy)]">All FAQ Answers</p>
                <p className="text-sm text-[var(--color-text-muted)]">Replace placeholder text with actual property information</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold text-xl">2.</span>
              <div>
                <p className="font-semibold text-[var(--color-navy)]">Season Dates</p>
                <p className="text-sm text-[var(--color-text-muted)]">Confirm Dry Season and Green Season dates are accurate</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold text-xl">3.</span>
              <div>
                <p className="font-semibold text-[var(--color-navy)]">Transfer Prices</p>
                <p className="text-sm text-[var(--color-text-muted)]">Review and confirm all transfer pricing is current</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold text-xl">4.</span>
              <div>
                <p className="font-semibold text-[var(--color-navy)]">Impact Metrics Documentation</p>
                <p className="text-sm text-[var(--color-text-muted)]">Document calculation methods and partner information</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}


