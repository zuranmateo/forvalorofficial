import { auth } from "@/auth"
import { client } from "@/sanity/lib/client"
import { COMMENT_BY_AUTHOR_ID_QUERY, USER_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { Mail, Edit } from "lucide-react"
import { CommentCardType } from "@/components/CommentCardProfile"
import { SanityLive } from "@/sanity/lib/live"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import CommentCard from "@/components/CommentCardProfile";

// Metadata za stran profila
export const metadata: Metadata = {
  title: "profile",
};

export default async function Page({params}: {params: Promise<{id: string}>}){

  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(USER_BY_ID_QUERY, {id});
  const posts = await client.fetch(COMMENT_BY_AUTHOR_ID_QUERY, {id})

  // Če uporabnik ne obstaja, prikažem error 404
  if(!user) return notFound();

  return (
    <main className="main">
      <div className="subheading">
        USER PROFILE
      </div>

       {/* Kartica s podatki o uporabniku */}
        <section className="profile-card">
          {session?.user?._id == id && session?.user?.provider != "github" ? 
            <Link
              href={`editProfile/${session?.user?._id}`}
              data-cy="edit-profile"
              className="absolute top-2 right-2 p-2"
            >
              <Edit className="text-white" />
            </Link>
          : ''}
          
          {/* Ime uporabnika */}
          <h3 className="text-4xl bg-secondary rounded-2xl px-4 py-2 mb-5 mt-3 min-w-[300px] text-center w-fit border-textprimary border-3">
            {user?.name}
          </h3>

           {/* Profilna slika */}
          <Image src={`${user?.image || user?.imageUrl || "/defaultProfileImg.png"}`}  
            alt="profile picture"
            height={100} 
            width={100} 
            className="rounded-full my-3 lg:h-35 lg:w-35 h-30 w-30 object-cover"
          />

          {/* Email naslov */}
          <div className="mt-4 flex items-center">
            <Mail className="mx-1 size-5"/>{user?.email}
          </div>
        </section>
        
        {/* Sekcija s komentarji */}
        <div>
          <div className="text-4xl text-textprimary mt-10 mb-4 px-10">
            {session?.user?._id == id ? "Your" : "All"} comments
          </div>

          <ul className="profile-comment-grid">
            {posts?.length > 0 ? (
              posts.map((post: CommentCardType) => (
                <CommentCard key={post?._id} post={post} authId={id}/>
              ))
            ):(
              // Če ni komentarjev
              <p className="flex items-center justify-center">
                No uploaded comments.
              </p>
            )}
          </ul>
        </div>
      <SanityLive />
    </main>
  )
}