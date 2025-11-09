# GA4 Integration Scripts & n8n Workflows
## Dolphin Blue Paradise - EspoCRM Integration

## 1. Frontend Tracking Scripts

### GTM Custom HTML Tag: Form View Tracking

```html
<!-- Form View Tracking -->
<script>
(function() {
  'use strict';
  
  // Track form views when forms become visible
  document.querySelectorAll('form[data-form-name]').forEach(function(form) {
    var formName = form.getAttribute('data-form-name');
    var formLocation = window.location.pathname;
    var hasTracked = false;
    
    // Use Intersection Observer to detect when form is visible
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !hasTracked) {
          hasTracked = true;
          
          // Push to dataLayer for GTM
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'form_view',
            'form_name': formName,
            'form_location': formLocation,
            'timestamp': new Date().toISOString()
          });
          
          // Also send directly to GA4 if needed
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_view', {
              'form_name': formName,
              'form_location': formLocation
            });
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% visible
    });
    
    observer.observe(form);
  });
})();
</script>
```

### GTM Custom HTML Tag: CTA Click Tracking

```html
<!-- CTA Click Tracking -->
<script>
(function() {
  'use strict';
  
  // Track all CTA clicks
  document.querySelectorAll('[data-cta]').forEach(function(cta) {
    cta.addEventListener('click', function(e) {
      var ctaName = cta.getAttribute('data-cta');
      var ctaLocation = cta.closest('section')?.id || 
                       cta.closest('[data-section]')?.getAttribute('data-section') || 
                       'unknown';
      var ctaText = cta.textContent.trim().substring(0, 50);
      
      // Push to dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'cta_click',
        'cta_name': ctaName,
        'cta_location': ctaLocation,
        'cta_text': ctaText,
        'timestamp': new Date().toISOString()
      });
      
      // Send to GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          'cta_name': ctaName,
          'cta_location': ctaLocation,
          'cta_text': ctaText
        });
      }
    });
  });
})();
</script>
```

### GTM Custom HTML Tag: Page Engagement Tracking

```html
<!-- Page Engagement Tracking -->
<script>
(function() {
  'use strict';
  
  var startTime = Date.now();
  var maxScroll = 0;
  var timeOnPage = 0;
  
  // Track scroll depth
  window.addEventListener('scroll', function() {
    var scrollPercent = Math.round(
      (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
    );
    maxScroll = Math.max(maxScroll, scrollPercent);
  });
  
  // Track time on page
  var engagementInterval = setInterval(function() {
    timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    // Send engagement event every 30 seconds
    if (timeOnPage % 30 === 0 && timeOnPage > 0) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'page_engagement',
        'page_path': window.location.pathname,
        'engagement_time_msec': timeOnPage * 1000,
        'scroll_depth': maxScroll
      });
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_engagement', {
          'page_path': window.location.pathname,
          'engagement_time_msec': timeOnPage * 1000,
          'scroll_depth': maxScroll
        });
      }
    }
  }, 1000);
  
  // Send final engagement on page unload
  window.addEventListener('beforeunload', function() {
    clearInterval(engagementInterval);
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'page_engagement',
      'page_path': window.location.pathname,
      'engagement_time_msec': timeOnPage * 1000,
      'scroll_depth': maxScroll,
      'final': true
    });
  });
})();
</script>
```

### Next.js API Route: GA4 Event Handler

```typescript
// apps/web/src/app/api/ga4-event/route.ts
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, params, user_email } = body;

    if (!env.GA4_MEASUREMENT_ID || !env.GA4_API_SECRET) {
      return NextResponse.json({ error: 'GA4 not configured' }, { status: 500 });
    }

    // Send to GA4 Measurement Protocol
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?api_secret=${env.GA4_API_SECRET}&measurement_id=${env.GA4_MEASUREMENT_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: user_email || 'anonymous',
          events: [
            {
              name: event,
              params: {
                ...params,
                timestamp_micros: Date.now() * 1000,
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error('GA4 event failed', response.status);
      return NextResponse.json({ error: 'Failed to send event' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('GA4 event error', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## 2. n8n Workflow: GA4 → EspoCRM

### Workflow JSON Configuration

```json
{
  "name": "GA4 to EspoCRM Lead Update",
  "nodes": [
    {
      "parameters": {
        "path": "ga4-events",
        "httpMethod": "POST",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-node",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "webhookId": "ga4-espocrm"
    },
    {
      "parameters": {
        "jsCode": "// Extract data from GA4 webhook\nconst items = $input.all();\nconst results = [];\n\nfor (const item of items) {\n  const body = item.json.body || item.json;\n  const events = body.events || [body];\n  \n  for (const event of events) {\n    const email = event.params?.user_email || \n                  event.params?.email || \n                  body.client_id || \n                  null;\n    \n    if (!email) continue;\n    \n    results.push({\n      json: {\n        email: email,\n        event_name: event.name || event.event_name,\n        event_params: event.params || {},\n        timestamp: event.params?.timestamp_msec || Date.now(),\n        page_path: event.params?.page_path || null,\n        form_name: event.params?.form_name || null,\n        cta_name: event.params?.cta_name || null,\n        engagement_time: event.params?.engagement_time_msec || null,\n        scroll_depth: event.params?.scroll_depth || null\n      }\n    });\n  }\n}\n\nreturn results;"
      },
      "id": "extract-data-node",
      "name": "Extract GA4 Data",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "={{ $env.ESPOCRM_URL }}/Lead",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-Api-Key",
              "value": "={{ $env.ESPOCRM_API_KEY }}"
            }
          ]
        },
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "where[0][type]",
              "value": "equals"
            },
            {
              "name": "where[0][attribute]",
              "value": "emailAddress"
            },
            {
              "name": "where[0][value]",
              "value": "={{ $json.email }}"
            }
          ]
        },
        "options": {}
      },
      "id": "find-lead-node",
      "name": "Find Lead in EspoCRM",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [650, 300]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "lead-exists",
              "leftValue": "={{ $json.list.length }}",
              "rightValue": 0,
              "operator": {
                "type": "number",
                "operation": "gt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "check-lead-exists-node",
      "name": "Check if Lead Exists",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [850, 300]
    },
    {
      "parameters": {
        "jsCode": "// Prepare update data based on event type\nconst eventName = $input.item.json.event_name;\nconst params = $input.item.json.event_params;\nconst lead = $('Find Lead in EspoCRM').item.json.list[0];\n\nconst updateData = {\n  websiteLastVisit: new Date().toISOString()\n};\n\n// Update based on event type\nswitch(eventName) {\n  case 'page_view':\n    updateData.websiteVisits = (lead.websiteVisits || 0) + 1;\n    updateData.websitePagesViewed = (lead.websitePagesViewed || 0) + 1;\n    \n    // Add page to visited pages array\n    const pagesVisited = JSON.parse(lead.websitePagesVisited || '[]');\n    if (params.page_path && !pagesVisited.includes(params.page_path)) {\n      pagesVisited.push(params.page_path);\n      updateData.websitePagesVisited = JSON.stringify(pagesVisited);\n    }\n    break;\n    \n  case 'form_view':\n    updateData.websiteFormViews = (lead.websiteFormViews || 0) + 1;\n    break;\n    \n  case 'cta_click':\n    updateData.websiteCTAClicks = (lead.websiteCTAClicks || 0) + 1;\n    break;\n    \n  case 'page_engagement':\n    if (params.engagement_time_msec) {\n      updateData.websiteTimeOnSite = Math.max(\n        lead.websiteTimeOnSite || 0,\n        Math.round(params.engagement_time_msec / 1000)\n      );\n    }\n    break;\n}\n\n// Set first visit if not set\nif (!lead.websiteFirstVisit) {\n  updateData.websiteFirstVisit = new Date().toISOString();\n}\n\nreturn [{\n  json: {\n    leadId: lead.id,\n    updateData: updateData\n  }\n}];"
      },
      "id": "prepare-update-node",
      "name": "Prepare Update Data",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [1050, 200]
    },
    {
      "parameters": {
        "method": "PUT",
        "url": "={{ $env.ESPOCRM_URL }}/Lead/{{ $json.leadId }}",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-Api-Key",
              "value": "={{ $env.ESPOCRM_API_KEY }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": []
        },
        "specifyBody": "json",
        "jsonBody": "={{ $json.updateData }}",
        "options": {}
      },
      "id": "update-lead-node",
      "name": "Update Lead",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [1250, 200]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $env.ESPOCRM_URL }}/Action/Workflow",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-Api-Key",
              "value": "={{ $env.ESPOCRM_API_KEY }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": []
        },
        "specifyBody": "json",
        "jsonBody": "={\n  \"workflowId\": \"lead-scoring-behavioral-workflow-id\",\n  \"entityType\": \"Lead\",\n  \"entityId\": \"{{ $json.leadId }}\"\n}",
        "options": {}
      },
      "id": "trigger-workflow-node",
      "name": "Trigger Scoring Workflow",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [1450, 200]
    },
    {
      "parameters": {
        "jsCode": "// Create new lead if not found\nconst email = $('Extract GA4 Data').item.json.email;\nconst eventName = $('Extract GA4 Data').item.json.event_name;\nconst params = $('Extract GA4 Data').item.json.event_params;\n\nconst newLead = {\n  emailAddress: email,\n  firstName: email.split('@')[0], // Extract name from email\n  lastName: '',\n  leadSource: 'Website',\n  websiteFirstVisit: new Date().toISOString(),\n  websiteLastVisit: new Date().toISOString(),\n  websiteVisits: 1,\n  websitePagesViewed: 1,\n  websitePagesVisited: JSON.stringify([params.page_path || '/']),\n  leadScoreDemographic: 5, // Email provided\n  leadScore: 5\n};\n\nreturn [{\n  json: newLead\n}];"
      },
      "id": "create-lead-node",
      "name": "Create New Lead",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [1050, 400]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $env.ESPOCRM_URL }}/Lead",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "X-Api-Key",
              "value": "={{ $env.ESPOCRM_API_KEY }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": []
        },
        "specifyBody": "json",
        "jsonBody": "={{ $json }}",
        "options": {}
      },
      "id": "post-lead-node",
      "name": "Create Lead in EspoCRM",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [1250, 400]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { success: true, message: 'Lead updated' } }}",
        "options": {}
      },
      "id": "respond-node",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Extract GA4 Data", "type": "main", "index": 0}]]
    },
    "Extract GA4 Data": {
      "main": [[{"node": "Find Lead in EspoCRM", "type": "main", "index": 0}]]
    },
    "Find Lead in EspoCRM": {
      "main": [[{"node": "Check if Lead Exists", "type": "main", "index": 0}]]
    },
    "Check if Lead Exists": {
      "main": [
        [
          {"node": "Prepare Update Data", "type": "main", "index": 0},
          {"node": "Create New Lead", "type": "main", "index": 0}
        ]
      ]
    },
    "Prepare Update Data": {
      "main": [[{"node": "Update Lead", "type": "main", "index": 0}]]
    },
    "Update Lead": {
      "main": [[{"node": "Trigger Scoring Workflow", "type": "main", "index": 0}]]
    },
    "Trigger Scoring Workflow": {
      "main": [[{"node": "Respond to Webhook", "type": "main", "index": 0}]]
    },
    "Create New Lead": {
      "main": [[{"node": "Create Lead in EspoCRM", "type": "main", "index": 0}]]
    },
    "Create Lead in EspoCRM": {
      "main": [[{"node": "Respond to Webhook", "type": "main", "index": 0}]]
    }
  },
  "pinData": {},
  "settings": {
    "executionOrder": "v1"
  },
  "staticData": null,
  "tags": [],
  "triggerCount": 0,
  "updatedAt": "2025-11-06T00:00:00.000Z",
  "versionId": "1"
}
```

---

## 3. Environment Variables Needed

```bash
# GA4 Configuration
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your-api-secret

# EspoCRM Configuration
ESPOCRM_URL=https://crm.yourdomain.com/api/v1
ESPOCRM_API_KEY=your-api-key

# n8n Webhook URL (for GA4 to call)
N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/ga4-events
```

---

## 4. Testing the Integration

### Test Script

```javascript
// Test GA4 event sending
async function testGA4Event() {
  const response = await fetch('/api/ga4-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: 'page_view',
      params: {
        page_path: '/rooms/premium-deluxe',
        user_email: 'test@example.com',
      },
      user_email: 'test@example.com',
    }),
  });
  
  console.log('GA4 Event Response:', await response.json());
}

// Test n8n webhook
async function testN8NWebhook() {
  const response = await fetch(process.env.N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 'test@example.com',
      events: [
        {
          name: 'page_view',
          params: {
            page_path: '/rooms/premium-deluxe',
            user_email: 'test@example.com',
            timestamp_msec: Date.now(),
          },
        },
      ],
    }),
  });
  
  console.log('n8n Webhook Response:', await response.json());
}
```

---

## 5. Monitoring & Debugging

### n8n Execution Logs

1. Ir a n8n dashboard
2. Ver "Executions" tab
3. Revisar logs de cada ejecución
4. Verificar errores y warnings

### EspoCRM API Logs

1. Ir a EspoCRM `Administración > Logs`
2. Filtrar por "API"
3. Revisar requests y responses

### GA4 DebugView

1. Ir a GA4 > DebugView
2. Ver eventos en tiempo real
3. Verificar que eventos se envían correctamente

---

**FIN DEL DOCUMENTO**

