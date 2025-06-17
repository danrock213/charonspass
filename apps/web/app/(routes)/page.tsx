// File: app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EAF4FF] flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 py-2 max-w-4xl mx-auto">
        {/* Logo, Name, and Tagline */}
{/* Logo, Name, and Tagline */}
<div className="bg-white rounded-2xl p-10 shadow-lg flex flex-col items-center mb-10 w-full max-w-md mx-auto">
  <Image src="/logo.png" alt="Starlit Passage Logo" width={200} height={200} />
  <h1 className="mt-4 text-4xl font-extrabold text-[#1D3557]">Starlit Passage</h1>
  <p className="mt-3 text-xl font-semibold text-[#1D3557] italic text-center">
    One place to plan, coordinate, and commemorate
  </p>
</div>


        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Everything you need for end-of-life planning — checklists, memorials, and vendors, all in one platform.
        </p>
        <div className="space-x-4">
          <Link
            href="/sign-up"
            className="inline-block bg-[#1D3557] text-white font-semibold px-6 py-3 rounded hover:bg-[#F4A261] transition"
          >
            Get Started
          </Link>
          <Link
            href="/user-auth"
            className="inline-block border border-[#1D3557] text-[#1D3557] font-semibold px-6 py-3 rounded hover:bg-[#1D3557] hover:text-white transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <FeatureCard
            title="Personalized Checklist"
            description="Stay organized with a customizable funeral planning checklist."
            icon="📝"
          />
          <FeatureCard
            title="Trusted Vendors"
            description="Find and connect with local funeral service providers."
            icon="🤝"
          />
          <FeatureCard
            title="Obituary & Website"
            description="Create meaningful obituaries and memorial websites."
            icon="🌐"
          />
          <FeatureCard
            title="Secure Messaging"
            description="Communicate privately with vendors."
            icon="✉️"
          />
        </div>
      </section>

      {/* You can add testimonials here later */}
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-default">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#1D3557] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
