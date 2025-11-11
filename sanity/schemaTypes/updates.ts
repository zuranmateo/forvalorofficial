// studio/schemas/user.ts
import { defineType, defineField } from 'sanity'

export const updates = defineType({
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options:{
        source: 'title'
      }
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      readOnly: true,
      initialValue: 'user',
      description: 'Document type identifier',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'rev',
      title: 'Revision',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    
    defineField({
      name: 'text',
      title: 'text',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'url',
      description: 'URL to user profile image',
      
    }),
  ],
})
