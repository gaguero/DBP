interface CoverPageProps {
  title?: string;
  subtitle?: string;
  description?: string;
  subDescription?: string;
}

export function CoverPage({
  title = "Dolphin Blue Paradise",
  subtitle = "Complete Site Structure & Strategy Guide",
  description = "Streamlined 7-page architecture designed for clarity, efficiency, and conversion",
  subDescription = "Comprehensive documentation of page structure, content strategy, and UX rationale",
}: CoverPageProps) {
  return (
    <div className="text-center py-24 px-10 bg-gradient-to-br from-[#E8F4F8] to-[#D5E9F2] rounded-lg mb-16">
      <h1 className="text-5xl text-[#1D3557] mb-5 font-display font-bold">
        {title}
      </h1>
      <h2 className="text-3xl text-[#3D7A94] mb-8 font-display font-semibold">
        {subtitle}
      </h2>
      <p className="text-lg text-[#6B7280] max-w-2xl mx-auto mb-0">
        {description}
      </p>
      <p className="mt-5 text-base text-[#9CA3AF]">{subDescription}</p>
    </div>
  );
}

