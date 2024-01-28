export interface FieldValidation {
  /**
   * The name of the field being validated.
   */
  field: string
  /**
   * A function that takes an object containing all form fields and returns an Error object if the field being validated is invalid, or null if it is valid.
   * @param input An object containing all form fields.
   * @returns An Error object if the field is invalid, or null if it is valid.
   */
  validate: (input: Record<string, any>) => Error
}
