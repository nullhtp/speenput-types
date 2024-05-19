type BaseField = {
  required?: boolean
  label: string
}

type InputField = BaseField & {
  fieldType: 'input'
  inputMode?: 'search' | 'text' | 'none' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal'
  defaultValue?: string
}

type PasswordField = BaseField & {
  fieldType: 'password'
  defaultValue?: string
}

type TextareaField = BaseField & {
  fieldType: 'textarea'
  defaultValue?: string
}

export type FieldDefinition = InputField | PasswordField | TextareaField
