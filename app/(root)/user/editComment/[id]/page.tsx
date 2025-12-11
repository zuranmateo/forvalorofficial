import { auth } from '@/auth'
import EditCommentForm from '@/components/edit/EditCommentForm';
import { redirect } from 'next/navigation';
import { writeClient } from '@/sanity/lib/write-client';
import { COMMENT_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Author, Slug, Markdown } from '@/sanity.types';

export type AuthorType = Omit<Author, "name" | "email" | "image" | "imageUrl"> & {
    name?: string | undefined;
    email?: string | undefined;
    image?: string | undefined;
    imageUrl?: string | undefined;
}

export type EditCommentType = Omit<Comment, "title" | "slug" | "description" | "author"> & {
    _id: string;
    title?: string | undefined;
    slug?: Slug | undefined;
    description?: Markdown | undefined;
    author?: AuthorType | undefined;
};

export default async function page({ params }: { params: { id: string } }){

    const session = await auth();

    const { id } = await params;
    
    const comment = await writeClient.fetch(COMMENT_BY_ID_QUERY, {id});

    if (session?.user?._id != comment?.author?._id) redirect("/");

  return (
    <section className='main'>
        <EditCommentForm comment={comment as unknown as EditCommentType} />
    </section>
  )
}