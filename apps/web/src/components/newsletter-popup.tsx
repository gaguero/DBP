'use client';

import { FormEvent, useEffect, useState } from 'react';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  function resetForm() {
    setName('');
    setEmail('');
    setPhone('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Name and email are required');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Failed to submit');
      }

      setStatus('success');
      resetForm();
    } catch (error) {
      console.error('Newsletter signup failed', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error');
    }
  }

  function handleDismiss() {
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="newsletter-overlay" role="dialog" aria-modal="true" aria-labelledby="newsletter-heading">
      <div className="newsletter-card">
        <button
          className="newsletter-close"
          type="button"
          onClick={handleDismiss}
          aria-label="Close newsletter signup"
        >
          X
        </button>
        <h2 id="newsletter-heading" className="newsletter-title">
          Subscribe to our newsletter
        </h2>
        <p className="newsletter-subtitle">
          Get the latest updates and seasonal experiences from Dolphin Blue Paradise.
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="newsletter-label">
            Name<span aria-hidden="true">*</span>
            <input
              type="text"
              name="name"
              className="newsletter-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label className="newsletter-label">
            Email<span aria-hidden="true">*</span>
            <input
              type="email"
              name="email"
              className="newsletter-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="newsletter-label">
            Phone (optional)
            <input
              type="tel"
              name="phone"
              className="newsletter-input"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
          <button type="submit" className="newsletter-submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'success' && (
            <p className="newsletter-feedback newsletter-feedback--success">Thanks! You are on the list.</p>
          )}
          {status === 'error' && (
            <p className="newsletter-feedback newsletter-feedback--error">
              {errorMessage ?? 'We could not save your request. Please try again.'}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
