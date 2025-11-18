import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";


export const update = defineType({
    name: "update",
    title: "Update",
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
            options: {
                source: "title",
            }
        }),
        defineField({
            name: "views",
            type:"number",
        }),
        defineField({
            name: "description",
            type:"text",
        }),
        defineField({
            name: "image",
            type: "image",
        }),
    ],
    preview: {
        select: {
            title: "name",
        },
    },
})