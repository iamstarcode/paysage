/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xzSZLGRM2k9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Component() {
  return (
    <div>
      <div>
        <Button>Open Modal</Button>
      </div>
      <div>
        <div>
          <div>Add Currency</div>
          <div>Enter the currency details below.</div>
          <div />
        </div>
        <div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-sm" htmlFor="name">
                Name
              </Label>
              <Input id="name" placeholder="Enter the name" required />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm" htmlFor="symbol">
                Symbol
              </Label>
              <Input id="symbol" placeholder="Enter the symbol" required />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm">Currencies</Label>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div>USDT</div>
                  <Switch />
                </div>
                <div className="flex items-center gap-2">
                  <div>BTC</div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center gap-2">
                  <div>ETH</div>
                  <Switch />
                </div>
                <div className="flex items-center gap-2">
                  <div>ADA</div>
                  <Switch />
                </div>
                <div className="flex items-center gap-2">
                  <div>DOT</div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline">Cancel</Button>
          <Button className="ml-auto">Save</Button>
        </div>
      </div>
    </div>
  )
}
