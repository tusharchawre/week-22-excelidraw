import type { Metadata } from "next";
import "./global.css"

export const metadata: Metadata = {
  title: "Sketchy",
  description: "A Real-time multiuser drawing app.",
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
