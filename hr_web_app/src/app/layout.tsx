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
      <body>
        {children}
      </body>
    </html>
  );
}
