'use client'

import { Input } from "@/components/ui/input";
import { useState, useActionState } from 'react';
import { EditCommentSchema } from "@/lib/validation";
import { z } from 'zod';
import { toast } from "sonner" 
import { useRouter } from "next/navigation";
import { Send, Trash2 } from "lucide-react";
import { UpdateComment, DeleteComment } from "@/lib/actions";
import { EditCommentType } from "@/app/(root)/user/editComment/[id]/page";
import MDeditor from '@uiw/react-md-editor';

export default function EditCommentForm({comment}: {comment: EditCommentType}){

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [title, setTitle] = useState(comment.title || "");
    const [desc, setDesc] = useState(comment.description || "");


    //console.log(user)
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
            try{
                const formValues = {
                    title: formData.get("title") as string,
                    desc,
                }

                console.log("\n \n \n \n \n",formValues, "\n \n \n \n \n");
    
                await EditCommentSchema.parseAsync(formValues);
    
                //console.log("\n \n \n \n \n",name, email, file, "\n \n \n \n \n");
                
                const result = await UpdateComment(prevState, formData, comment?._id, desc);
                
                if(result.status == 'SUCCESS'){
                    toast.success("Your comment was updated")
                }
                await new Promise(resolve => setTimeout(resolve, 2000));

                router.push(`/user/${comment?.author?._id}`);
            }
            catch (error){
                if(error instanceof z.ZodError){
                    const fieldErrors = error.flatten().fieldErrors;
                    
                    setErrors(fieldErrors as unknown as Record<string, string>);
                    
                    //console.log("\n \n \n \n \n",title , "\n \n \n \n \n");

                    toast.error("Please check your inputs and try again");
    
                    return {...prevState, error: 'Updating failed', status:'ERROR'};
                }
    
                toast.error("Unexpected error");
                return {...prevState, error: 'unexpected error', status: 'ERROR'};
            } 
        };

        const handleFormSubmit2 = async () => {
            try{
    
                //console.log("\n \n \n \n \n",name, email, file, "\n \n \n \n \n");
                
                const result = await DeleteComment(comment?._id);
                
                if(result.status == 'SUCCESS'){
                    toast.success("Your comment was deleted")
                }
                await new Promise(resolve => setTimeout(resolve, 2000));

                router.push(`/user/${comment?.author?._id}`);
            }
            catch (error){
                if(error instanceof z.ZodError){
                    const fieldErrors = error.flatten().fieldErrors;
                    
                    setErrors(fieldErrors as unknown as Record<string, string>);
                    
                    //console.log("\n \n \n \n \n",title , "\n \n \n \n \n");

                    toast.error("Deleteing failed");
    
                    return {error: 'deleting failed', status:'ERROR'};
                }
    
                toast.error("Unexpected error");
                return {error: 'unexpected error', status: 'ERROR'};
            } 
        };


    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
        error : '',
        status: 'INITIAL',
        }
    );

    const [state2, formAction2, isPending2] = useActionState(handleFormSubmit2,
        {
        error : '',
        status: 'INITIAL',
        }
    );

    //console.log("\n \n \n \n \n",comment?._id ,"\n \n \n \n \n");

  return (
    <div className="editProfile-form">
    <form action={formAction} className="">
        <h3 className="text-textprimary text-5xl mb-4 text-center font-cardinal">
            Edit profile
        </h3>
        <div className='comment-form-part'>
            <label htmlFor="title" className='comment-form-label'>title</label>
            <Input 
                id='title'
                name='title'
                className='Comment-form-input'
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className='comment-form-error'>{errors.title}</p>}
        </div>
        <div className='comment-form-part'>
            <label htmlFor="desc" className='comment-form-label'>Description</label>
            
            <MDeditor 
                value={desc}
                onChange={(value) => setDesc(value as string)}
                className='comment-form-mdeditor'
                preview='edit'
                id='desc'
                height={300}
                style={{
                    borderRadius:20,
                    overflow:'hidden',
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

            {errors.desc && <p className='comment-form-error'>{errors.desc}</p>}
        </div>

        <button type='submit' className='comment-form-btn' disabled={isPending}>
            {isPending || isPending2 ? 'Submitting...' : 'Update Comment'} <Send className='size-6 ml-2 mt-1' />
        </button>
    </form>
    <form action={formAction2}>
       <button type='submit' className='px-5 py-3 my-6 border-red-600 bg-secondary w-fit flex flex-row rounded-xl border-3 text-red-600 text-xl hover:text-secondary hover:bg-red-600' disabled={isPending}>
            {isPending2 || isPending ? 'Deleting...' : 'Delete Comment'} <Trash2 className='size-6 ml-2 mt-1' />
        </button>
    </form>
    </div>
  )
}