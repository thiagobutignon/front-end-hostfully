export interface Validation {
  validate: (fieldName: string, input: Record<string, any>) => string
}
