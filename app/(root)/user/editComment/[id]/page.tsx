import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { writeClient } from "@/sanity/lib/write-client"
import { COMMENT_BY_ID_QUERY } from "@/sanity/lib/queries"
import { Author, Slug, Markdown } from "@/sanity.types"
import EditCommentForm from "@/components/edit/EditCommentForm";

export type AuthorType = Omit<Author, "name" | "email" | "image" | "imageUrl"> & {
    name?: string | undefined;
    email?: string | undefined;
    image?: string | undefined;
    imageUrl?: string | undefined;
}

// Tip podatkov za urejanje komentarja
export type EditCommentType = Omit<Comment, "title" | "slug" | "description" | "author"> & {
    _id: string;
    title?: string | undefined;
    slug?: Slug | undefined;
    description?: Markdown | undefined;
    author?: AuthorType | undefined;
};

export default async function Page({ params }: { params: { id: string } }){

    const session = await auth();
    const {id} = await params;
    const comment = await writeClient.fetch(COMMENT_BY_ID_QUERY, {id});
    
    // Če prijavljen uporabnik ni avtor komentarja, ga preusmeri
    if (session?.user?._id != comment?.author?._id) redirect("/");

  return (
    <section className="main">

        {/* Forma za urejanje komentarja */}
        <EditCommentForm comment={comment as unknown as EditCommentType}/>

    </section>
  )
}