'use client';

export default function HelpResources() {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-[#1D3557] mb-2">Help & Resources</h2>
      <ul className="list-disc list-inside text-blue-700">
        <li><a href="/help/how-to-use-checklist" className="underline">How to Use the Checklist</a></li>
        <li><a href="/help/booking-vendors" className="underline">Booking Vendors Guide</a></li>
        <li><a href="/help/creating-tributes" className="underline">Creating Meaningful Tributes</a></li>
        <li><a href="/help/contact-support" className="underline">Contact Support</a></li>
      </ul>
    </section>
  );
}
