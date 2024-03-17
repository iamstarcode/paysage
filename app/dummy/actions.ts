"use server"

import { FormState } from "@/types"
import { todoSchema } from "@/utils/schema"

export async function createTodo(prevState: any, formData: FormData) {
  const result = todoSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    let errorMsg: string[] = []

    result.error.issues.forEach((issue) => {
      errorMsg.push(issue.path[0] + ": " + issue.message)
    })

    return {
      errors: errorMsg,
      message: "Error: Please Check Your Input!",
      type: "ValidationError",
    } as FormState
  }
}
