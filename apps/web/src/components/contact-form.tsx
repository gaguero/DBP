"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

type SubmissionState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    arrival: "",
    departure: "",
    message: "",
    consent: false,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Name, email, and message are required");
      setStatus("error");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim());
      data.append("message", formData.message.trim());
      if (formData.phone) data.append("phone", formData.phone.trim());
      if (formData.arrival) data.append("arrival", formData.arrival);
      if (formData.departure) data.append("departure", formData.departure);
      if (formData.consent) data.append("consent", "on");
      data.append("locale", "en");

      const response = await fetch("/api/lead", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        arrival: "",
        departure: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      console.error("Form submission failed", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try WhatsApp or email instead.");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  if (status === "success") {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-display text-xl text-[var(--color-navy)] mb-3">
          Thank You!
        </h3>
        <p className="text-[var(--color-text-muted)] mb-4">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="button-secondary mt-4"
        >
          Send Another Message
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-black/20 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-black/20 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
          >
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-black/20 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="arrival"
              className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
            >
              Arrival Date (Optional)
            </label>
            <input
              type="date"
              id="arrival"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black/20 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="departure"
              className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
            >
              Departure Date (Optional)
            </label>
            <input
              type="date"
              id="departure"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black/20 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-[var(--color-navy)] mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-black/20 rounded-md focus:ring-2 focus:ring-[var(--color-ocean)] focus:border-transparent resize-none"
            placeholder="Tell us about your travel plans, questions, or special requests..."
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1"
          />
          <label
            htmlFor="consent"
            className="text-sm text-[var(--color-text-muted)]"
          >
            I agree to receive marketing communications and updates from Dolphin
            Blue Paradise (optional)
          </label>
        </div>

        {status === "error" && errorMessage && (
          <div className="p-4 bg-red-50 text-red-800 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}

