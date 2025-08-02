export const initialValueTemplates = [
  {
    id: 'ad-featured',
    title: 'Featured Ad',
    description: 'Create a featured ad',
    schemaType: 'ad',
    parameters: [
      { name: 'featured', type: 'boolean', title: 'Featured' },
      { name: 'site', type: 'string', title: 'Site' }
    ],
    value: (params: { featured?: boolean; site?: string }) => ({
      featured: params.featured ?? true,
      title: 'Featured Ad',
      site: params.site || 'oly',
    }),
  },
  {
    id: 'ad-standard',
    title: 'Standard Ad', 
    description: 'Create a standard ad',
    schemaType: 'ad',
    parameters: [
      { name: 'site', type: 'string', title: 'Site' }
    ],
    value: (params: { site?: string }) => ({
      title: 'New Ad',
      site: params.site || 'oly',
      featured: false,
    }),
  },
]