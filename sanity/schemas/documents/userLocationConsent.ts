// This schema manages user consent for location access.

export const userLocationConsent = {
    name: 'userLocationConsent',
    title: 'User Location Consent',
    type: 'document',
    fields: [
        {
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who provided the consent.'
        },
        {
            name: 'consentGiven',
            title: 'Consent Given',
            type: 'boolean',
            description: 'Whether the user has given consent to use their location data.'
        },
        {
            name: 'consentTimestamp',
            title: 'Consent Timestamp',
            type: 'datetime',
            description: 'The date and time when the user gave their consent.'
        },
        {
            name: 'consentDetails',
            title: 'Consent Details',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Details about the consent given, including how the location data will be used.'
        },
        
    ],
    // ... preview configuration
};
