import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Request Hub",
  description: "Streamline approvals and requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}