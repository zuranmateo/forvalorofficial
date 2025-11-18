import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SanityLive } from "@/sanity/lib/live";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar />
        {children}
        <Footer />
        <SanityLive />
    </main>
  );
}
