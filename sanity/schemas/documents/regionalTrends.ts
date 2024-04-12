import { defineType, defineField } from 'sanity';

// This schema can be used for analyzing trends based on regional data, 
// useful for market insights and user recommendations.
export const regionalTrends = defineType({
    name: 'regionalTrends',
    title: 'Regional Trends',
    type: 'document',
    fields: [
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            description: 'The region for which trends are being analyzed.'
        }),
        defineField({
            name: 'trendData',
            title: 'Trend Data',
            type: 'reference',
            to: [{ type: 'trendData' }],
            description: 'Data representing different trends in the specified region.'
        }),
        
    ],
});
