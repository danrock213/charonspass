import Link from "next/link";

export default function VendorDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600">
          Manage your profile, messages, and listings here.
        </p>
      </header>

      <nav className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/vendor-profile" className="bg-white shadow-sm hover:shadow-md p-4 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
          <p className="text-sm text-gray-600">Edit your business info and details.</p>
        </Link>

        <Link href="/vendor-messages" className="bg-white shadow-sm hover:shadow-md p-4 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
          <p className="text-sm text-gray-600">View and respond to user inquiries.</p>
        </Link>

        <Link href="/vendor-listings" className="bg-white shadow-sm hover:shadow-md p-4 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Listings</h2>
          <p className="text-sm text-gray-600">Manage your services and offerings.</p>
        </Link>
      </nav>
    </main>
  );
}
