import { defineQuery } from "next-sanity";

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
   *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    email,
    password,
    imageUrl,
   } 
`);

export const CHECK_FOR_EXISTING_AUTHOR = defineQuery(`
   *[_type == "author" && email == $email][0]
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
   *[_type == "author" && email == $email][0]{
  _id,
  id,
  name,
  email,
  password,
  "image": image.asset->url,
  imageUrl
}
`);

export const UPDATES_QUERY = defineQuery(`
   *[_type == "update" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  _updatedAt,
  _createdAt,
  _rev,
  _type,
  slug,
  smallDesc,
  desc,
  version,
  views,
  "image": image.asset->url,
}
`)


export const UPDATES_BY_SLUG_QUERY = defineQuery(`
   *[_type == "update" && defined(slug.current) && slug.current == $slug][0]{
  _id,
  title,
  _updatedAt,
  _createdAt,
  _rev,
  _type,
  slug,
  smallDesc,
  desc,
  version,
  views,
  "image": image.asset->url,
}
`)