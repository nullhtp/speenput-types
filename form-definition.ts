import { FieldDefinition } from './field-definition'
import { TypesWithParams } from './types-with-params'

export type FormDefinition<T extends { type: string } = { type: string }> =
  T extends TypesWithParams<T>
    ? {
        type: T['type']
        label: string
        params: Record<keyof T['params'], FieldDefinition>
      }
    : { type: T['type']; label: string }
