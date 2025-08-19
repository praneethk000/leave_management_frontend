// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Leave Management System",
  description: "Manage employees, leaves, and requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Header (persistent across all pages) */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">Leave Management System</h1>
        </header>

        {/* Main Content */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}
