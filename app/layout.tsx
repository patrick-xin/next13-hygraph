import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "@/styles/globals.css";
import { Lato, Playfair_Display } from "@next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.className} ${lato.className}`}>
      <head />
      <body>
        <Navbar />
        <main className="max-w-screen-2xl mx-auto sm:p-6 lg:p-0 lg:pb-12 min-h-screen overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
