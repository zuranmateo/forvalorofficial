import UpdateCard from "@/components/UpdateCard"
import { client } from "@/sanity/lib/client"
import { UPDATES_QUERY } from "@/sanity/lib/queries"
import { UpdateCardType } from "@/components/UpdateCard"
import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live"

export const metadata: Metadata = {
  title: "Updates",
};

export default async function Page(){

  const posts = await client.fetch(UPDATES_QUERY);
  
  return (
    <main className="main">
      <div className="subheading">
        SEE UPDATES HERE
      </div>

      <section className="mt-10">
        <ul className="update-grid">

          {posts?.length > 0 ? (

            // Če posodobitve obstajajo, jih izpišem
            posts.map((post: UpdateCardType) => (
              <UpdateCard key={post?._id} post={post} />
            ))
          ):(
            
            // Če ni nobene posodobitve
            <p className=''>No updates</p>
          )}

        </ul>
      </section>
      <SanityLive />
    </main>
  )
}