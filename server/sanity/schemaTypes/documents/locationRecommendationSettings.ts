import { defineType, defineField } from 'sanity';

// This schema can be used to store settings for providing location-based recommendations to users.
export const locationBasedRecommendationSettings = defineType({
    name: 'locationBasedRecommendationSettings',
    title: 'Location-Based Recommendation Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user for whom the recommendations are personalized.',
        }),
        defineField({
            name: 'enableRecommendations',
            title: 'Enable Recommendations',
            type: 'boolean',
            description: 'Whether the user has opted to receive location-based recommendations.',
        }),
       
    ],
});
