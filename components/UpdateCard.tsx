import { Slug, Update } from '@/sanity.types';
import { FormatDate } from '@/sanity/lib/utils'


export type UpdateCardType = Omit<Update, "image" | "title" | "slug"> & {
    slug?: Slug | null;
    title?: string | null;
    image?: string | null;
};


const UpdateCard = ({post}:{post: UpdateCardType}) => {
  return (
    <li className='update-card'>
        <div className='flex-between text-textprimary px-5 py-7 min-h-[350px] rounded-2xl'  style={{backgroundImage: `url('${post?.image}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="flex flex-row justify-between rounded-2xl">
                <div className='bg-primary/85 p-4 rounded-2xl max-w-[500px] h-fit'>
                    <h1 className="text-4xl">
                    {post?.title}
                    </h1>
                    <p className='text-textgray py-3 text-2xl'>
                    Version: {post.version}
                    </p>
                </div>
                <div>
                    <p className="text-textgray text-md bg-primary/90 p-3 rounded-2xl">
                        {FormatDate(post?._updatedAt)}
                    </p>
                </div>
            </div>
            <div className='items-center'>
                <p className='bg-primary/85 p-4 rounded-2xl h-fit mt-15 text-textprimary text-xl max-w-[900px]'>
                    {post?.smallDesc}
                </p>
            </div>
            <div className='mt-2'>
                <p className="text-textgray text-md bg-primary/90 p-3 rounded-2xl w-fit">
                    views: {post?.views}
                </p>
            </div>
        </div>
    </li>
  )
}

export default UpdateCard