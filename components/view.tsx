import Ping from "./Ping";
import { writeClient } from "@/sanity/lib/write-client";
import { UPDATE_VIEWS_QUERY } from "@/sanity/lib/queries";

export default async function View({ slug }: { slug: string }) {

  // Prepreči samodejne re-renderje
  const post = await writeClient.fetch(
    UPDATE_VIEWS_QUERY,
    { slug },
    { cache: "no-store" }
  );

  if (post?.views !== undefined && post.views != null) {
    const newViews = post.views + 1;

    await writeClient
      .patch(post._id)
      .set({ views: newViews })
      .commit();

    post.views = newViews;
  }

  return (
    <div className="text-textprimary text-md bg-secondary p-3 rounded-2xl flex justify-end items-center mt-5 fixed bottom-3 right-10">
      <div className="absolute -top-1 -right-1">
        <Ping />
      </div>
      <p>
        <span>views: {post?.views}</span>
      </p>
    </div>
  );
}
