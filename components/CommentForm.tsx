'use client'
import { Input } from "@/components/ui/input";
import { useState, useActionState } from 'react';
import MDeditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchema } from "@/lib/validation";
import { z } from 'zod';
import { toast } from "sonner" 
import { useRouter } from "next/navigation";
import { createComment } from "@/lib/actions";


export default function CommentForm(){

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [description, setDescription] = useState("I like the game");

    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description,
            }

            await formSchema.parseAsync(formValues);

            //console.log(formValues);

            const result = await createComment(prevState, formData, description);
            
            if(result.status == 'SUCCESS'){
                toast.success("Your comment was created succesfully")
            }

            router.push(`/comments`)
        }
        catch (error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);

                toast.error("Please check your inputs and try again");

                return {...prevState, error: 'validation failed', status:'ERROR'};
            }

            toast.error("Unexpected error");
            return {...prevState, error: 'unexpected error', status: 'ERROR'};
        } 
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
        error : '',
        status: 'INITIAL',
        }
    );

  return (
    <form action={formAction} className='bg-primary p-5 my-4 rounded-2xl min-w-[500px]'>
        <div className='comment-form-part'>
            <label htmlFor="title" className='comment-form-label'>Title</label>
            <Input 
                id='title'
                name='title'
                className='Comment-form-input'
                placeholder='comment title'
            />
            {errors.title && <p className='comment-form-error'>{errors.title}</p>}
        </div>

        <div className='comment-form-part'>
            <label htmlFor="description" className='comment-form-label'>Description</label>
            
            <MDeditor 
                value={description}
                onChange={(value) => setDescription(value as string)}
                className='comment-form-mdeditor'
                preview='edit'
                id='description'
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

            {errors.description && <p className='comment-form-error'>{errors.description}</p>}
        </div>

        <button type='submit' className='cursor-pointer comment-form-btn' disabled={isPending}>
            {isPending ? 'Submitting...' : 'Post comment'} <Send className='size-6 ml-2 mt-1' />
        </button>
    </form>
  )
}