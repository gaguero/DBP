import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/card";

export const metadata: Metadata = {
  title: "Form Testing - Drip Campaign Forms",
  description: "Testing page for News and Offers and Get Personalized Assistance forms",
  robots: "noindex, nofollow", // Don't index testing page
};

export default function FormTestingPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHero
        title="Form Testing"
        kicker="Drip Campaign Forms"
        description="Test the News and Offers and Get Personalized Assistance forms before deploying to production."
        image="/images/rooms-view.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="space-y-8">
            {/* Instructions */}
            <Card className="p-6 bg-warm-sand/50">
              <h2 className="text-2xl font-display mb-4">Testing Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted">
                <li>Fill out either form below with test data</li>
                <li>Submit the form and check the success message</li>
                <li>Verify the lead was created in EspoCRM</li>
                <li>For News and Offers: Check that Email 1 was sent automatically</li>
                <li>For Get Personalized Assistance: Check that a task was created for the agent (no automatic email)</li>
                <li>Check EspoCRM workflows are triggered correctly</li>
              </ol>
              <p className="mt-4 text-xs text-muted italic">
                Note: This page should only be accessible in development or with a special flag.
              </p>
            </Card>

            {/* Two Forms Side by Side */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form 1: News and Offers */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-display mb-2">News and Offers Form</h2>
                    <p className="text-sm text-muted">
                      This form starts the drip campaign automatically. Email 1 will be sent immediately after submission.
                    </p>
                  </div>

                  <form action="/api/lead" method="POST" className="space-y-4" id="news-offers-form">
                    <input type="hidden" name="formType" value="news-offers" />
                    <input type="hidden" name="locale" value="en" />

                    <div>
                      <label htmlFor="no-name" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="no-name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="no-email" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="no-email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="no-phone" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="no-phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="+1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-deep-navy mb-2">
                        Preferred Language
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="language" value="EN" defaultChecked className="text-ocean" />
                          <span className="text-sm text-muted">English</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="language" value="ES" className="text-ocean" />
                          <span className="text-sm text-muted">Spanish</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-deep-navy mb-2">
                        Interests (Optional)
                      </label>
                      <div className="space-y-2">
                        {["rooms", "dining", "activities", "volunteering"].map((interest) => (
                          <label key={interest} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="interests"
                              value={interest}
                              className="text-ocean rounded"
                            />
                            <span className="text-sm text-muted capitalize">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="consent"
                          value="true"
                          required
                          className="text-ocean rounded"
                        />
                        <span className="text-sm text-muted">
                          I consent to receive marketing emails from Dolphin Blue Paradise *
                        </span>
                      </label>
                    </div>

                    <input type="hidden" name="message" value="Interested in news and special offers" />

                    <button
                      type="submit"
                      className="w-full bg-ocean text-white px-6 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-golden-accent hover:text-deep-navy transition-colors"
                    >
                      Subscribe to News & Offers
                    </button>
                  </form>
                </div>
              </Card>

              {/* Form 2: Get Personalized Assistance */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-display mb-2">Get Personalized Assistance Form</h2>
                    <p className="text-sm text-muted">
                      This form requires manual agent review. A task will be created for the agent to send a personalized Email 1.
                    </p>
                  </div>

                  <form action="/api/lead" method="POST" className="space-y-4" id="personalized-assistance-form">
                    <input type="hidden" name="formType" value="personalized-assistance" />
                    <input type="hidden" name="locale" value="en" />

                    <div>
                      <label htmlFor="pa-name" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="pa-name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="Jane Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="pa-email" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="pa-email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="pa-phone" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="pa-phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="+1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-deep-navy mb-2">
                        Preferred Language
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="language" value="EN" defaultChecked className="text-ocean" />
                          <span className="text-sm text-muted">English</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="language" value="ES" className="text-ocean" />
                          <span className="text-sm text-muted">Spanish</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pa-arrival" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                          Arrival Date
                        </label>
                        <input
                          type="date"
                          id="pa-arrival"
                          name="arrival"
                          className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy"
                        />
                      </div>

                      <div>
                        <label htmlFor="pa-departure" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                          Departure Date
                        </label>
                        <input
                          type="date"
                          id="pa-departure"
                          name="departure"
                          className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pa-party-size" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Party Size
                      </label>
                      <input
                        type="number"
                        id="pa-party-size"
                        name="partySize"
                        min="1"
                        max="10"
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40"
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-deep-navy mb-2">
                        Interests (Optional)
                      </label>
                      <div className="space-y-2">
                        {["rooms", "dining", "activities", "volunteering"].map((interest) => (
                          <label key={interest} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="interests"
                              value={interest}
                              className="text-ocean rounded"
                            />
                            <span className="text-sm text-muted capitalize">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pa-message" className="block text-xs font-semibold uppercase text-deep-navy mb-1">
                        Message / Questions *
                      </label>
                      <textarea
                        id="pa-message"
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-deep-navy/16 rounded-lg bg-white text-deep-navy placeholder:text-deep-navy/40 resize-y"
                        placeholder="Tell us about your travel plans, questions, or specific needs..."
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="consent"
                          value="true"
                          required
                          className="text-ocean rounded"
                        />
                        <span className="text-sm text-muted">
                          I consent to receive marketing emails from Dolphin Blue Paradise *
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-ocean text-white px-6 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-golden-accent hover:text-deep-navy transition-colors"
                    >
                      Get Personalized Assistance
                    </button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Testing Checklist */}
            <Card className="p-6 bg-warm-sand/30">
              <h3 className="text-xl font-display mb-4">Testing Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-deep-navy">News and Offers Form</h4>
                  <ul className="space-y-1 text-muted">
                    <li>☐ Form submits successfully</li>
                    <li>☐ Lead created in EspoCRM</li>
                    <li>☐ formSource = "News and Offers Form"</li>
                    <li>☐ dripCampaignType = "News and Offers"</li>
                    <li>☐ dripCampaignStatus = "Active (Email 1)"</li>
                    <li>☐ Email 1 sent automatically</li>
                    <li>☐ Agent assigned correctly</li>
                    <li>☐ Target List updated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-deep-navy">Get Personalized Assistance Form</h4>
                  <ul className="space-y-1 text-muted">
                    <li>☐ Form submits successfully</li>
                    <li>☐ Lead created in EspoCRM</li>
                    <li>☐ formSource = "Get Personalized Assistance Form"</li>
                    <li>☐ dripCampaignType = "Get Personalized Assistance"</li>
                    <li>☐ dripCampaignStatus = "Waiting for Manual Email 1"</li>
                    <li>☐ NO email sent automatically</li>
                    <li>☐ Task created for agent</li>
                    <li>☐ Agent assigned correctly</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Link to EspoCRM */}
            <Card className="p-6 bg-ocean/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display mb-1">Verify in EspoCRM</h3>
                  <p className="text-sm text-muted">
                    After submitting a form, check EspoCRM to verify the lead was created and workflows were triggered.
                  </p>
                </div>
                <a
                  href={process.env.ESPOCRM_URL?.replace("/api/v1", "") || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-ocean text-white rounded-lg hover:bg-golden-accent hover:text-deep-navy transition-colors text-sm font-semibold uppercase tracking-wider"
                >
                  Open EspoCRM
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

