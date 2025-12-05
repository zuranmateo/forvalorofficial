import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { UPDATE_VIEWS_QUERY } from '@/sanity/lib/queries';


export default async function View({slug}: {slug: string}){

    const post  = await client.fetch(UPDATE_VIEWS_QUERY, {slug});
    //console.log(post)
  return (
    <>
    <div className="text-textprimary text-md bg-secondary p-3 rounded-2xl flex justify-end items-center mt-5 fixed bottom-3 right-10">
        <div className='absolute -top-1 -right-1'>
            <Ping />
        </div>
        <p className=''>
            <span>
                views: {post?.views}
            </span>
        </p>
    </div>
    </>
  )
}
