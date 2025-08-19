// app/page.tsx
"use client";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Employees Card */}
          <Link href="/employees">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-800">Employees</h3>
              <p className="text-gray-500 mt-2">View and add employees</p>
            </div>
          </Link>

          {/* Leave Balances Card */}
          <Link href="/leave-balances">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-800">Leave Balances</h3>
              <p className="text-gray-500 mt-2">Check and manage leave balances</p>
            </div>
          </Link>

          {/* Leave Requests Card */}
          <Link href="/leave-requests">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-800">Leave Requests</h3>
              <p className="text-gray-500 mt-2">Apply, approve or reject leave</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
