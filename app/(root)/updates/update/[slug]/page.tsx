import { client } from "@/sanity/lib/client";
import { UPDATES_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export default async function page (props: { params: Promise<{ slug: string }> }){

  const { slug } = await props.params; 
  const post = await client.fetch(UPDATES_BY_SLUG_QUERY, { slug });

  console.log(post)
  return (
    <section className="main">
      <div className="bg-primary min-w-[800px] my-10 py-10 px-7">
        {post?.title}
      </div>
    </section>
  )
}