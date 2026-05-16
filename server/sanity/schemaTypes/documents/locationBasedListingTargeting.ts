import { defineType, defineField } from 'sanity';

// This schema helps to use location data to target listings more effectively.
export const locationBasedListingTargeting = defineType({
    name: 'locationBasedListingTargeting',
    title: 'Location-Based Listing Targeting',
    type: 'document',
    fields: [
        defineField({
            name: 'listingId',
            title: 'Listing ID',
            type: 'reference',
            to: [{ type: 'listing' }],
            description: 'The listing to which this targeting information applies.',
        }),
        defineField({
            name: 'targetLocations',
            title: 'Target Locations',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'location' }] }],
            description: 'Locations where this listing should be specifically targeted.',
        }),
        defineField({
            name: 'exclusionZones',
            title: 'Exclusion Zones',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'location' }] }],
            description: 'Locations where this listing should not be shown.',
        }),
        
    ],
});
