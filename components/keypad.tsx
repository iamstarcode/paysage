/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GnPD49d7CyB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Component() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Enter amount</CardTitle>
        <CardDescription>Enter the amount to pay.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="grid w-full gap-2 text-3xl">
          <div className="grid grid-cols-4 gap-2 justify-center">
            <Button size="lg">1</Button>
            <Button size="lg">2</Button>
            <Button size="lg">3</Button>
            <Button size="lg" variant="outline">
              <span className="sr-only">Enter decimal point</span>.
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 justify-center">
            <Button size="lg">4</Button>
            <Button size="lg">5</Button>
            <Button size="lg">6</Button>
            <Button size="lg" variant="outline">
              <span className="sr-only">Enter decimal point</span>,
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 justify-center">
            <Button size="lg">7</Button>
            <Button size="lg">8</Button>
            <Button size="lg">9</Button>
            <Button className="opacity-0" disabled size="lg">
              0
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 justify-center">
            <Button className="col-span-2" size="lg">
              Clear
            </Button>
            <Button size="lg">0</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button size="lg">Pay</Button>
        <Button size="lg" variant="outline">
          Print receipt
        </Button>
      </CardFooter>
    </Card>
  )
}
