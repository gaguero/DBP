export function BookingWidgetPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
      <div className="max-w-xl space-y-3">
        <h2 className="section-heading">Plan Your Escape</h2>
        <p className="text-muted">
          Our secure booking widget will appear here. Choose your travel dates, select your
          suite, and let our concierge craft every detail for your stay.
        </p>
      </div>
      <div className="card w-full max-w-md text-left">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)]">
          Coming Soon
        </p>
        <p className="text-sm text-muted">
          Embedded booking provided by our reservation partner. We'll integrate availability,
          promotions, and add-ons once API credentials are supplied.
        </p>
      </div>
    </div>
  );
}