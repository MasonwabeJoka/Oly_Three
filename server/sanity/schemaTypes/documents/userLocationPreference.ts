// This schema captures the user's preferred locations for browsing or posting ads.

export const userLocationPreference = {
    name: 'userLocationPreference',
    title: 'User Location Preference',
    type: 'document',
    fields: [
        {
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who has set these preferences.'
        },
        {
            name: 'preferredLocations',
            title: 'Preferred Locations',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'location' }] }],
            description: 'List of locations the user prefers for browsing or posting ads.'
        },
     
    ],
  
};
