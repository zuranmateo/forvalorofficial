'use client'

import { Input } from "@/components/ui/input"
import { useState, useActionState } from "react"
import { EditCommentSchema } from "@/lib/validation"
import { z } from "zod"
import { toast } from "sonner" 
import { useRouter } from "next/navigation"
import { Send, Trash2 } from "lucide-react"
import { UpdateComment, DeleteComment } from "@/lib/actions"
import { EditCommentType } from "@/app/(root)/user/editComment/[id]/page"
import MDeditor from "@uiw/react-md-editor";

// Komponenta za urejanje komentarja
export default function EditCommentForm({comment}: {comment: EditCommentType}){

    // State za napake pri validaciji
    const [errors, setErrors] = useState<Record<string, string>>({});

    // State za naslov in opis komentarja
    const [title, setTitle] = useState(comment.title || "");
    const [desc, setDesc] = useState(comment.description || "");

    const Router = useRouter();

    const HandleFormSubmit = async (prevState: any, formData: FormData) => {
            try{
                const FormValues = {
                    title: formData.get("title") as string,
                    desc,
                }

                console.log("\n \n \n \n \n",FormValues, "\n \n \n \n \n");
    
                await EditCommentSchema.parseAsync(FormValues);
                
                // Klic funkcije za update komentarja
                const Result = await UpdateComment(prevState, formData, comment?._id, desc);
                
                if(Result.status == "SUCCESS"){
                    toast.success("Your comment was updated.")
                }
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Preusmeritev nazaj na profil avtorja
                Router.push(`/user/${comment?.author?._id}`);
            }
            catch (error){
                if(error instanceof z.ZodError){
                    const fieldErrors = error.flatten().fieldErrors;

                    setErrors(fieldErrors as unknown as Record<string, string>);
                    toast.error("Please check your inputs and try again.");
    
                    return {
                        ...prevState, error: "Updating failed!", status:"ERROR"
                    };
                }
                toast.error("Unexpected error");
                return {...prevState, error: "Unexpected error.", status: "ERROR"};
            } 
        };

        const HandleFormSubmit2 = async () => {
            try{
                const Result = await DeleteComment(comment?._id);
                
                if(Result.status == 'SUCCESS'){
                    toast.success("Your comment was deleted!")
                }
                await new Promise(resolve => setTimeout(resolve, 2000));

                Router.push(`/user/${comment?.author?._id}`);
            }
            catch (error){
                if(error instanceof z.ZodError){

                    const fieldErrors = error.flatten().fieldErrors;
                    
                    setErrors(fieldErrors as unknown as Record<string, string>);
                    toast.error("Deleteing failed");   
                    return {
                        error: 'deleting failed', status:'ERROR'
                    };
                }
    
                toast.error("Unexpected error");
                return {error: 'unexpected error', status: 'ERROR'};
            } 
        };


    const [state, formAction, isPending] = useActionState(HandleFormSubmit,
        {
        error : '',
        status: 'INITIAL',
        }
    );

    const [state2, formAction2, isPending2] = useActionState(HandleFormSubmit2,
        {
        error : '',
        status: 'INITIAL',
        }
    );

  return (
    <div className="editProfile-form">
        
        {/* Forma za urejanje komentarja */}
        <form action={formAction} className="">
            <h3 className="text-textprimary text-5xl mb-4 text-center font-cardinal">
                Edit profile
            </h3>

            <div className="comment-form-part">
                <label 
                    htmlFor="title" 
                    className="comment-form-label">
                    title
                </label>
                <Input 
                    id="title"
                    name="title"
                    className="Comment-form-input"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="comment-form-error">{errors.title}</p>}
            </div>

            <div className="comment-form-part">
                <label htmlFor="desc" className="comment-form-label">Description</label>
                
                <MDeditor 
                    value={desc}
                    onChange={(value) => setDesc(value as string)}
                    className="comment-form-mdeditor"
                    preview="edit"
                    id="desc"
                    height={300}
                    style={{
                        borderRadius:20,
                        overflow:"hidden",
                        backgroundColor: "#221c1b",
                        color: "#d4af37" 
                    }}
                    textareaProps={{
                        placeholder: "add the description of your comment",
                        required: true,
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />

                {errors.desc && <p className="comment-form-error">{errors.desc}</p>}
            </div>

            {/* Gumb za posodobitev komentarja */}
            <button 
                type="submit" 
                className="comment-form-btn" 
                disabled={isPending}>
                {isPending || isPending2 ? 'Submitting...' : 'Update Comment'} 
                <Send className="size-6 ml-2 mt-1"/>
            </button>
        </form>

        {/* Forma za brisanje komentarja */}
        <form action={formAction2}>
        <button 
            type="submit"
            className="px-5 py-3 my-6 border-red-600 bg-secondary w-fit flex flex-row rounded-xl border-3 text-red-600 text-xl hover:text-secondary hover:bg-red-600"
            disabled={isPending}>
            {isPending2 || isPending ? 'Deleting...' : 'Delete Comment'} 
            <Trash2 className="size-6 ml-2 mt-1"/>
        </button>
        </form>
    </div>
  )
}