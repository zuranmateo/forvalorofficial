import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";


export const comment = defineType({
    name: "comment",
    title: "Comment",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "title",
            type:"string",
        }),
        defineField({
            name: "slug",
            type:"slug",
            options:{
                source: "title",
            }
        }),
        defineField({
            name: "author",
            type:"reference",
            to: {type: 'author'},
        }),
        defineField({
            name: "description",
            type:"text",
        }),
        defineField({
            name: "views",
            type:"number",
        }),
        defineField({
            name: "image",
            type:"url",
        }),
    ],
    preview: {
        select: {
            title: "name",
        },
    },
})