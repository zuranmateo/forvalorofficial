import { defineField, defineType } from "sanity";
import { BellIcon } from "lucide-react";

export const update = defineType({
    name: "update",
    title: "Update",
    type: "document",
    icon: BellIcon,
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
            name: "version",
            type:"string",
        }),
        defineField({
            name: "views",
            type:"number",
        }),
        defineField({
            name: "desc",
            type:"markdown",
        }),
        defineField({
            name: "smallDesc",
            type:"text",
        }),
        defineField({
            name: "image",
            type: "image",
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
})