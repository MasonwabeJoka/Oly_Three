export const initialValueTemplates = [
  {
    id: 'listing-featured',
    title: 'Featured Listing',
    description: 'Create a featured listing',
    schemaType: 'listing',
    parameters: [
      { name: 'featured', type: 'boolean', title: 'Featured' },
      { name: 'site', type: 'string', title: 'Site' }
    ],
    value: (params: { featured?: boolean; site?: string }) => ({
      featured: params.featured ?? true,
      title: 'Featured Listing',
      site: params.site || 'oly',
    }),
  },
  {
    id: 'listing-standard',
    title: 'Standard Listing', 
    description: 'Create a standard listing',
    schemaType: 'listing',
    parameters: [
      { name: 'site', type: 'string', title: 'Site' }
    ],
    value: (params: { site?: string }) => ({
      title: 'New Listing',
      site: params.site || 'oly',
      featured: false,
    }),
  },
]