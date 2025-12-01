import UpdateCard from '@/components/UpdateCard'
import { client } from '@/sanity/lib/client'
import { UPDATES_QUERY } from '@/sanity/lib/queries'
import { UpdateCardType } from '@/components/UpdateCard'

export default async function page(){


  const posts = await client.fetch(UPDATES_QUERY);
  //console.log(JSON.stringify(posts, null, 2))
  /*
  const posts = [
    {
      _updatedAt: new Date(),
      views: 55,
      slug: "bowman1",
      _id: 1,
      smallDesc: "they joined the fight. Bowmans are new character that weer added in this update. we also added a lot more stuff so i can infill this information page right here, everything exept bowman is bullcrap bla bla bla",
      title: "bowman is a good solider",
      version:"1.0.1",
      image: "https://erepublic.brightspotcdn.com/dims4/default/220290f/2147483647/strip/false/crop/8081x4555+0+0/resize/1486x838!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.us-west-2.amazonaws.com%2F44%2F0c%2Fbf3043cf4952945a5b3281fcfa16%2Fadobestock-955269760.jpeg",
    }
  ]
*/
  return (
    <main className='main'>
      <div className='subheading'>
        SEE UPDATES HERE
      </div>
      <section className='mt-10'>
        <ul className='update-grid'>
          {posts?.length > 0 ? (
            posts.map((post) => (
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