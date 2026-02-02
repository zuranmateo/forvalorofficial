import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { writeClient } from "@/sanity/lib/write-client"
import { USER_BY_ID_QUERY } from "@/sanity/lib/queries"
import { Author } from "@/sanity.types"
import EditProfileForm from "@/components/edit/EditProfileForm";

// Tip za urejanje uporabniškega profila
// Razširi Author tip in omogoči optional polja
export type EditAuthorType = Omit<Author, "name" | "email" | "image" | "imageUrl"> & {
    name?: string | undefined;
    email?: string | undefined;
    image?: string | undefined;
    imageUrl?: string | undefined;
}

// Async server component za urejanje profila
export default async function Page({ params }: { params: { id: string } }){

  const session = await auth();
  const { id } = await params;
    
  if(!session) redirect("/");
  if(session?.user?._id != id) redirect("/");
    
  const user = await writeClient.fetch(USER_BY_ID_QUERY, {id});

  return (
    <section className="main">

        {/* Forma za urejanje uporabniškega profila */}
        <EditProfileForm user={user as unknown as EditAuthorType} />

    </section>
  )
}