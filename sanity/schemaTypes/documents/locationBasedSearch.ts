import { defineType, defineField } from 'sanity';

// This schema allows users to search by various geographical units such as country, state, city, and suburb.
// It is also designed to capture user preferences for searches that are filtered by location.
// It can be used to store search criteria and user-defined settings for location-based searches.
export const locationBasedSearch = defineType({
    name: 'locationBasedSearch',
    title: 'Location-Based Search',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who has set up these search preferences.',
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            description: 'The country to include in the search.',
        }),
        defineField({
            name: 'stateOrProvince',
            title: 'State or Province',
            type: 'string',
            description: 'The state or province to include in the search.',
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            description: 'The city to include in the search.',
        }),
        defineField({
            name: 'suburb',
            title: 'Suburb',
            type: 'string',
            description: 'The suburb to include in the search.',
        }),
        defineField({
            name: 'searchRadius',
            title: 'Search Radius',
            type: 'number',
            description: 'The radius in kilometers or miles within which to search from the specified point.',
        }),
        defineField({
            name: 'baseLocation',
            title: 'Base Location',
            type: 'geopoint',
            description: 'The geographical point from which the search radius applies.',
        }),
        defineField({
            name: 'includeNearbyAreas',
            title: 'Include Nearby Areas',
            type: 'boolean',
            description: 'Whether to include nearby areas in the search.',
        }),
        defineField({
            name: 'filterCriteria',
            title: 'Filter Criteria',
            type: 'object',
            fields: [
                defineField({
                    name: 'categories',
                    title: 'Categories',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'category' }] }],
                    description: 'Categories to include in the search.',
                }),
                // Additional filter criteria like price range, item condition, etc.
            ],
            description: 'Specific criteria to filter the search results.',
        }),
        defineField({
            name: 'savedSearchName',
            title: 'Saved Search Name',
            type: 'string',
            description: 'A user-given name to identify the saved search.',
        }),
        defineField({
            name: 'lastUsed',
            title: 'Last Used',
            type: 'datetime',
            description: 'The last time this search configuration was used.',
        }),
      
    ],
});
