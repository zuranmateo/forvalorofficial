import UpdateCard from '@/components/UpdateCard'
import { client } from '@/sanity/lib/client'
import { UPDATES_QUERY } from '@/sanity/lib/queries'
import { UpdateCardType } from '@/components/UpdateCard'

export default async function page(){


  const posts = await client.fetch(UPDATES_QUERY);
  
  return (
    <main className='main'>
      <div className='subheading'>
        SEE UPDATES HERE
      </div>
      <section className='mt-10'>
        <ul className='update-grid'>
          {posts?.length > 0 ? (
            posts.map((post: UpdateCardType) => (
              <UpdateCard key={post?._id} post={post} />
            ))
          ):(
            <p className=''>No updates</p>
          )}
        </ul>
      </section>
    </main>
  )
}