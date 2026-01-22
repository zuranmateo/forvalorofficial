import CommentForm from "@/components/CommentForm"
import { redirect } from "next/navigation"
import { auth } from "@/auth";

export default async function Page(){

  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="main">
      <h1 className="subheading">
        CREATE COMMENT
      </h1>
      <CommentForm />
    </div>
  )
}