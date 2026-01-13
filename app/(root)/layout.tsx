import { auth } from "@/auth";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SanityLive } from "@/sanity/lib/live";
import { signOut } from "next-auth/react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if(session && session.user._id == null){
    signOut();
  }
  
  return (
    <main>
        <Navbar />
        {children}
        <Footer />
        <SanityLive />
    </main>
  );
}
