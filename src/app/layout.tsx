import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const getHela =localFont({
  src: "./fonts/HelveticaNeueMedium.otf",
  variable: "--font-hela",
  weight: "100 900",
})
export const metadata: Metadata = {
  title: "I miglori bigletti  per Gieolier su fanSale",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" ></link>
      </head>
      <body
        className={`  ${getHela.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
