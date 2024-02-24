import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function RecentTransactions() {
  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Your most recent money transfers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                  <img
                    alt="User 1"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Alice Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sent $100 to Bob Smith
                  </p>
                </div>
                <div className="text-right">
                  <time className="text-sm font-semibold">2 hours ago</time>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                  <img
                    alt="User 2"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Bob Smith</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Received $100 from Alice Johnson
                  </p>
                </div>
                <div className="text-right">
                  <time className="text-sm font-semibold">3 hours ago</time>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                  <img
                    alt="User 3"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Eve Jackson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sent $50 to Mallory Williams
                  </p>
                </div>
                <div className="text-right">
                  <time className="text-sm font-semibold">5 hours ago</time>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default RecentTransactions
