import { defineType, defineField } from 'sanity';

// This schema helps to use location data to target ads more effectively.
export const locationBasedAdTargeting = defineType({
    name: 'locationBasedAdTargeting',
    title: 'Location-Based Ad Targeting',
    type: 'document',
    fields: [
        defineField({
            name: 'adId',
            title: 'Ad ID',
            type: 'reference',
            to: [{ type: 'ad' }],
            description: 'The ad to which this targeting information applies.',
        }),
        defineField({
            name: 'targetLocations',
            title: 'Target Locations',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'location' }] }],
            description: 'Locations where this ad should be specifically targeted.',
        }),
        defineField({
            name: 'exclusionZones',
            title: 'Exclusion Zones',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'location' }] }],
            description: 'Locations where this ad should not be shown.',
        }),
        
    ],
});
