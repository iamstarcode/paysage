import { todoSchema } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Todo() {
  //const [state, formAction] = useFormState(transferFromWallet, initialState)

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="min-h-[200px]"
              id="description"
              placeholder="Description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <Input defaultValue="" id="due-date" type="date" />
          </div>
          <Button type="submit">Create</Button>
        </div>
      </CardContent>
    </Card>
  )
}
