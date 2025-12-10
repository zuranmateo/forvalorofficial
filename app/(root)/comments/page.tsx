import CommentCard from '@/components/CommentCard';
import { client } from '@/sanity/lib/client';
import { COMMENT_QUERY } from "@/sanity/lib/queries";
import { CommentCardType } from "@/components/CommentCard";
import Link from 'next/link';
import { SanityLive } from '@/sanity/lib/live';

export default async function page(){
  const posts = await client.fetch(COMMENT_QUERY);
  
  return (
    <main className='main'>
      <div className='subheading'>
        SEE UPDATES HERE
      </div>
      <section className='mt-10'>
        <Link href="./CreateComment">
            <div className='comment-btn'>
                COMMENT +
            </div>
        </Link>
        <ul className='comment-grid'>
          {posts?.length > 0 ? (
            posts.map((post: CommentCardType) => (
              <CommentCard key={post?._id} post={post}/>
            ))
          ):(
            <p className=''>No comments</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </main>
  )
}
