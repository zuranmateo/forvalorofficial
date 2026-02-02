import CommentCard from "@/components/CommentCard"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { COMMENT_QUERY } from "@/sanity/lib/queries"
import { CommentCardType } from "@/components/CommentCard"
import { SanityLive } from "@/sanity/lib/live"
import type { Metadata } from "next";

// Metadata za stran
export const metadata: Metadata = {
  title: "comments",
};

export default async function Page(){

  const posts = await client.fetch(COMMENT_QUERY);
  
  return (
    <main className="main">

        <div className="subheading">
          SEE UPDATES HERE
        </div>

        <section className="mt-10">

          <Link href="./CreateComment">
              <div className="comment-btn">
                  COMMENT +
              </div>
          </Link>

          {/* Seznam komentarjev */}
          <ul className="comment-grid">
            {posts?.length > 0 ? (
              posts.map((post: CommentCardType) => (
                <CommentCard key={post?._id} post={post}/>
              ))
            ):(
              <p className=''>No comments</p>
            )}
          </ul>

        </section>

      {/* Real-time posodobitve */}
      <SanityLive />
      
    </main>
  )
}
