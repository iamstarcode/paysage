"use client"

import { FormState } from "@/types"
import { todoSchema } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createTodo } from "@/app/dummy/actions"

import { SubmitButton } from "./SubmitButton"

const initialState: FormState = {
  message: "",
}

export default function Todo() {
  const [state, formAction] = useFormState(createTodo, initialState)

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    mode: "onChange",
    resetOptions: {
      keepValues: false,
    },
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function clientAction(formData: FormData) {
    const result = todoSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!result.success) {
      form.trigger()
    } else {
      formAction(formData)
    }
  }

  return (
    <Form {...form}>
      <form>
        <Card>
          <CardHeader>
            <CardTitle>Create Todo</CardTitle>
            <CardDescription>Form for creating a simple Todo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Title</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Title"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Description</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Description"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <SubmitButton
              className="ml-auto"
              formAction={clientAction}
              text="Create Todo"
              pendingText="Creating Todo..."
            />
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
