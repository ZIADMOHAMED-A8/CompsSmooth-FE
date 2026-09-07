
"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "./queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid using useState for initializing the query client if you are
  // using Next.js SSR. It can cause bugs if React suspends.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}