import View from "@/components/view";
import { client } from "@/sanity/lib/client";
import { UPDATES_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { FormatDate } from "@/sanity/lib/utils";
import  markdownit  from "markdown-it";

const md = markdownit();

export default async function page (props: { params: Promise<{ slug: string }> }){

  const { slug } = await props.params; 
  const post = await client.fetch(UPDATES_BY_SLUG_QUERY, { slug });

  const parsedContent = md.render(post?.desc || '');
  //console.log(post)
  return (
    <>
      {post ? (
        <section className="main">
        <div className="bg-primary max-w-[1000px] min-w-[400px] my-10 rounded">
        <div className='flex-between text-textprimary px-5 py-7 min-h-[350px] rounded'  style={{backgroundImage: `url('${post?.image}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="flex flex-row justify-between">
            <div className='bg-primary/85 p-4 rounded-2xl max-w-[500px] h-fit'>
                <h1 className="text-4xl">
                  {post?.title}
                </h1>
              <p className='text-textgray py-3 text-2xl'>
                Version: {post?.version}
              </p>
            </div>
            <div>
              <p className="text-textgray text-md bg-primary/90 p-3 rounded-2xl">
                {FormatDate(post?._updatedAt)}
              </p>
            </div>
          </div>
        </div>
        <h3 className="p-4 text-textprimary text-2xl mt-10">
          INFO
        </h3>
        <div className="py-5 px-3 text-textprimary text-xl bg-background mx-6 break-all">
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{__html : parsedContent}}
            />
          ) : (
            <p>no details provided</p>
          )}
        </div>
        <div className='mt-2'>
          <View slug={slug}/>
        </div>
      </div>
      </section>
      ) : (
        <section className="main-two">
          <div className="bg-primary max-w-[1000px] my-10 p-7 text-center rounded min-w-[400px] text-textprimary text-3xl">
          no update found
      </div>
        </section>
      )}
    </>
  )
}