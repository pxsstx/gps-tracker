import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"], // Specify subset(s) based on your needs
  variable: "--font-poppins", // Define CSS variable for the font
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Include all necessary weights
});

export const metadata: Metadata = {
  title: "GPS Tracker",
  description: "GPS Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}