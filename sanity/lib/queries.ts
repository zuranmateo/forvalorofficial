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

export const USER_BY_ID_QUERY = defineQuery(`
   *[_type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  email,
  password,
  "image": image.asset->url,
  imageUrl
}
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

export const UPDATE_VIEWS_QUERY = defineQuery(`
   *[_type == "update" && defined(slug.current) && slug.current == $slug][0]{
      _id, slug, views
   }
`)

export const COMMENT_QUERY = defineQuery(`
   *[_type == "comment" && defined(slug.current)] | order(_createdAt desc) {
   _id,
  title,
  _updatedAt,
  _createdAt,
  _rev,
  _type,
  slug,
  author -> {
   _id, name, email, "image": image.asset->url, imageUrl, _createdAt, _updatedAt, _rev, _type
  },
  description,
   }
`)

export const CHECK_FOR_ID_QUERY = defineQuery(`
   *[_type == "author" && id == $generatedId][0]{
      id
   }
`)


export const COMMENT_BY_AUTHOR_ID_QUERY = defineQuery(`
   *[_type == "comment" && defined(slug.current) && author._ref == $id] | order(_createdAt desc) {
   _id,
  title,
  _updatedAt,
  _createdAt,
  _rev,
  _type,
  slug,
  author -> {
   _id, name, email, "image": image.asset->url, imageUrl, _createdAt, _updatedAt, _rev, _type
  },
  description,
   }
`)