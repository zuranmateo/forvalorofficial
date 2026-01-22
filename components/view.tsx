import Ping from "./Ping"
import { writeClient } from "@/sanity/lib/write-client";
import { UPDATE_VIEWS_QUERY } from "@/sanity/lib/queries";

// Server komponenta za beleženje in prikaz števila ogledov objave
export default async function View({slug}: {slug: string}){

    const post  = await writeClient.fetch(UPDATE_VIEWS_QUERY, {slug});

    // Če število ogledov obstaja in je >= 0,
    // poveča views za 1 in spremembo shrani
    if(post?.views && post.views >= 0){
        await writeClient.patch(post._id).set({views: post.views + 1}).commit();
        post.views = post.views + 1;
    }

  return (
    <>
    <div className="text-textprimary text-md bg-secondary p-3 rounded-2xl flex justify-end items-center mt-5 fixed bottom-3 right-10">
        <div className="absolute -top-1 -right-1">
            <Ping />{/* Ping animacija za vizualni efekt */}
        </div>

        <p className="">
            <span>
                views: {post?.views}
            </span>
        </p>
    </div>
    </>
  )
}
