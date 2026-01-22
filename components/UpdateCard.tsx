import { Markdown, Slug, Update } from "@/sanity.types";
import { FormatDate } from "@/lib/utils"
import Link from "next/link";

export type UpdateCardType = Omit<Update, "image" | "title" | "slug" | "version" | "views" | "smallDesc" | "desc"> & {
    image?: string | null;
    title?: string | null;
    slug?: Slug | null;
    version?: string | null;
    views?: number | null;
    smallDesc?: string | null;
    desc?: Markdown | null;
};

// Za prikaz posamezne posodobitve
const UpdateCard = ({post}:{post: UpdateCardType}) => {
  return (
    <li className="update-card">
        <Link href={`updates/update/${post?.slug?.current}`}>
        
            {/* Glavni vsebinski blok z ozadjem slike posodobitve */}
            <div 
                className="flex-between text-textprimary px-5 py-7 min-h-[350px] rounded-2xl"  
                style={{backgroundImage: `url("${post?.image}")`, 
                backgroundSize: "cover", 
                backgroundPosition: "center"}}>

                {/* Zgornji del kartice: naslov, verzija in datum */}
                <div className="flex md:flex-row flex-col gap-1 justify-between rounded-2xl">
                    <div className="bg-primary/85 p-4 rounded-2xl max-w-[500px] h-fit">
                        <h1 className="text-4xl">
                            {post?.title}
                        </h1>
                        
                        {/* Verzija posodobitve */}
                        <p className="text-textgray py-3 text-2xl">
                            Version: {post?.version}
                        </p>
                    </div>
                    
                    {/* Datum zadnje posodobitve */}
                    <div>
                        <p className="text-textgray text-md bg-primary/90 p-3 rounded-2xl w-fit">
                            {FormatDate(post?._updatedAt)}
                        </p>
                    </div>
                </div>

                    <div className="items-center">
                        <p className="bg-primary/85 p-4 rounded-2xl h-fit mt-15 text-textprimary text-xl max-w-[900px]">
                            {post?.smallDesc}
                        </p>
                    </div>
                    <div className="mt-2">
                        <p className="text-textgray text-md bg-primary/90 p-3 rounded-2xl w-fit">
                            Views: {post?.views}
                        </p>
                    </div>
            </div>
        </Link>
    </li>
  )
}
export default UpdateCard
