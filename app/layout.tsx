import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deli Grill | Premium New York Restaurant",
  description:
    "Experience New York's finest deli and grill. Reserve your table at Deli Grill — West Village's destination for premium dining.",
  keywords: ["restaurant", "New York", "deli", "grill", "fine dining", "West Village"],
  openGraph: {
    title: "Deli Grill | Premium New York Restaurant",
    description: "New York's finest deli experience. Reserve your table today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1a1918",
              color: "#faf8f5",
              border: "1px solid rgba(201, 169, 98, 0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
