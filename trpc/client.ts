// Mock tRPC client
export const trpc = {
  useQuery: () => ({ data: null, isLoading: false, error: null }),
  createClient: (config: any) => ({}),
  Provider: ({ children }: any) => children
} as any;