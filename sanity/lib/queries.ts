import { defineQuery } from "next-sanity";

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
   *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    email,
    password,
    image,
    imageUrl,
   } 
`);