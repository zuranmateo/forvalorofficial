'use server'

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import  slugify  from "slugify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComment = async (state: any, form: FormData, desc: string) => {
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'Not singed in',
        status: 'Error',

    });

    const { title } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'desc')
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try{
        const comment = {
            title,
            desc,
            slug:{
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.user.id
            }
        }

        //console.log(comment);
    }
    catch(error){
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR'
        });
    }
}