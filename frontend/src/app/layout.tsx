import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "EmailShare — Share emails with your team",
  description: "A simple SaaS to share and organize emails across teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
