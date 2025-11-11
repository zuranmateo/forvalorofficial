// studio/schemas/user.ts
import { defineType, defineField } from 'sanity'
import { optional } from 'zod'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      readOnly: true,
      description: 'System-generated unique identifier',
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
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().error('Enter a valid email address'),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'url',
      description: 'URL to user profile image',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'password',
      title: 'Password (hashed)',
      type: 'string',
    }),
    defineField({
      name: 'githubId',
      title: 'GitHub ID',
      type: 'string',
      description: 'GitHub user ID for OAuth login',
    }),
    defineField({
        name: 'bought',
        title: 'Bought',
        type: 'boolean',
        description:'bought the game',
        initialValue: false,
    }),
  ],
})
