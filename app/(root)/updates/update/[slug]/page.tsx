import View from "@/components/view";
import markdownit  from "markdown-it";
import { client } from "@/sanity/lib/client";
import { UPDATES_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { FormatDate } from "@/lib/utils";

const md = markdownit();

export default async function Page (props: { params: Promise<{ slug: string }> }){

  // Pridobim slug iz URL parametrov
  const { slug } = await props.params; 
  const Post = await client.fetch(UPDATES_BY_SLUG_QUERY, { slug });

  const parsedContent = md.render(Post?.desc || '');
 
  return (
    <>
      {Post ? (
         // Če objava obstaja
        <section className="main">

          <div className="bg-primary max-w-[1000px] min-w-[400px] my-10 rounded">
            <div 
                className="flex-between text-textprimary px-5 py-7 min-h-[350px] rounded"
                style={{backgroundImage: `url('${Post?.image}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
              <div className="flex flex-row justify-between">
                  <div className="bg-primary/85 p-4 rounded-2xl max-w-[500px] h-fit">
                    <h1 className="text-4xl">
                      {Post?.title}
                    </h1>

                    <p className="text-textgray py-3 text-2xl">
                      Version: {Post?.version}
                    </p>
                  </div>
                <div>

                <p className="text-textgray text-md bg-primary/90 p-3 rounded-2xl">
                  {FormatDate(Post?._updatedAt)}
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
                <p>No details provided</p>
              )}
            </div>

            <div className="mt-2">
              <View slug={slug}/>
            </div>

          </div>
        </section>
        ) : (
          // Če objava ne obstaja
          <section className="main-two">
            <div className="bg-primary max-w-[1000px] my-10 p-7 text-center rounded min-w-[400px] text-textprimary text-3xl">
              No update found
            </div>
        </section>
      )}
    </>
  )
}