// Mock Sanity client
export const client = {
  fetch: async (query: string) => {
    return [];
  }
};

export const urlFor = (source: any) => ({
  url: () => '/placeholder.jpg'
});