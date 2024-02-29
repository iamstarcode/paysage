"use client"

import { ThemeProvider } from "next-themes"
import { SWRConfig } from "swr"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" themes={["light", "cupckae", "dark"]}>
      {/*   <QueryClientProvider client={queryClient}>
       {children}
    </QueryClientProvider> */}
      <SWRConfig value={{ revalidateIfStale: false, revalidateOnFocus: false }}>
        {children}
      </SWRConfig>
    </ThemeProvider>
  )
}
