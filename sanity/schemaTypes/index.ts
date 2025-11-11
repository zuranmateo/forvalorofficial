import { type SchemaTypeDefinition } from 'sanity'
import { user } from "./user";
import { updates } from './updates';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, updates],
}
