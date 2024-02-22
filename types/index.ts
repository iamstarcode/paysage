export interface FormState {
  message: string
  errors?: any[]
  type?: "ValidationError" | "WarningError" | "Error" | "Success"
}
