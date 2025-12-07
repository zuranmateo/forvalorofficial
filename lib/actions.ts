'use server'

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import  slugify  from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComment = async (state: any, form: FormData, description: string) => {
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });

    const { title } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'description')
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try{
        const comment = {
            title,
            description,
            slug:{
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.user?._id,
            }
        }

        const result = await writeClient.create({_type: 'comment', ...comment})
        //console.log(comment);

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    }
    catch(error){
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR'
        });
    }
}