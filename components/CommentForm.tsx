'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import MDeditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';

export default function CommentForm(){

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [description, setDescription] = useState("I like the game");

    const isPending = false;

  return (
    <form action={() => {}} className='bg-primary p-5 my-4 rounded-2xl min-w-[500px]'>
        <div className='comment-form-part'>
            <label htmlFor="title" className='comment-form-label'>Title</label>
            <Input 
                id='title'
                name='title'
                className='Comment-form-input'
                required
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

        <button type='submit' className='comment-form-btn' disabled={isPending}>
            {isPending ? 'Submitting...' : 'Post comment'} <Send className='size-6 ml-2 mt-1' />
        </button>
    </form>
  )
}