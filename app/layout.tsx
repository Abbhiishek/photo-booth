import type { Metadata } from "next";
import { Geist, Geist_Mono , Lora , IBM_Plex_Mono} from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Photo Booth - HexaFalls Hackathon '25",
  description: "For 32 thrilling hours, journey through strange circuits and curious code, as you explore workshops, solve mysteries, and build the future from the heart of the unknown.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="For 32 thrilling hours, journey through strange circuits and curious code, as you explore workshops, solve mysteries, and build the future from the heart of the unknown."
          />
          <meta property="og:site_name" content="hexafalls.com" />
          <meta
            property="og:description"
            content="For 32 thrilling hours, journey through strange circuits and curious code, as you explore workshops, solve mysteries, and build the future from the heart of the unknown."
          />
          <meta property="og:title" content="Hexa Falls Hackathon '25" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Hexa Falls Hackathon '25" />
          <meta
            name="twitter:description"
            content="For 32 thrilling hours, journey through strange circuits and curious code, as you explore workshops, solve mysteries, and build the future from the heart of the unknown."
          />
      </Head>
      <body
        className={`${lora.className} ${ibmPlexMono.variable} antialiased dark`}
      >
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
