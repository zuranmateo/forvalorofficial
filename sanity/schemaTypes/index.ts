import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { update } from './update'
import { comment } from './comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, update, comment],
}
