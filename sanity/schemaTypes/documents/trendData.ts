export const trendData = {
    name: 'trendData',
    title: 'Trend Data',
    type: 'document',
    fields: [
        {
            name: 'popularCategories',
            title: 'Popular Categories',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'The most popular categories in the region based on user activity and listing postings.'
        },
        {
            name: 'averagePrice',
            title: 'Average Price',
            type: 'object',
            fields: [
                {
                    name: 'category',
                    title: 'Category',
                    type: 'string',
                    description: 'The category for which the average price is calculated.'
                },
                {
                    name: 'value',
                    title: 'Value',
                    type: 'number',
                    description: 'The average price of items within the category.'
                },
            ],
            description: 'The average price of items within popular categories.'
        },
        {
            name: 'searchVolume',
            title: 'Search Volume',
            type: 'object',
            fields: [
                {
                    name: 'keyword',
                    title: 'Keyword',
                    type: 'string',
                    description: 'The search keyword.'
                },
                {
                    name: 'count',
                    title: 'Count',
                    type: 'number',
                    description: 'The number of searches for the keyword.'
                },
            ],
            description: 'The volume of searches for specific keywords or phrases.'
        },
        {
            name: 'userEngagement',
            title: 'User Engagement',
            type: 'object',
            fields: [
                {
                    name: 'pageViews',
                    title: 'Page Views',
                    type: 'number',
                    description: 'The average number of page views on listings.'
                },
                {
                    name: 'timeSpent',
                    title: 'Time Spent',
                    type: 'number',
                    description: 'The average time users spend on the platform.'
                },
            ],
            description: 'Metrics indicating how users engage with the platform.'
        },
        {
            name: 'listingPostings',
            title: 'Listing Postings',
            type: 'object',
            fields: [
                {
                    name: 'totalListings',
                    title: 'Total Listings Posted',
                    type: 'number',
                    description: 'The total number of listings posted in the region.'
                },
                {
                    name: 'listingsPerCategory',
                    title: 'Listings Per Category',
                    type: 'object',
                    fields: [
                        {
                            name: 'category',
                            title: 'Category',
                            type: 'string'
                        },
                        {
                            name: 'count',
                            title: 'Count',
                            type: 'number'
                        },
                    ],
                    description: 'The number of listings posted per category.'
                },
            ],
            description: 'The number of listing postings in the region, including category breakdowns.'
        },
        {
            name: 'demographics',
            title: 'Demographics',
            type: 'object',
            fields: [
                {
                    name: 'ageGroups',
                    title: 'Age Groups',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'The distribution of users across different age groups.'
                },
                {
                    name: 'genderRatio',
                    title: 'Gender Ratio',
                    type: 'string',
                    description: 'The ratio of male to female users.'
                },
            ],
            description: 'Demographic information of the users in the region.'
        },
        {
            name: 'marketGrowth',
            title: 'Market Growth',
            type: 'object',
            fields: [
                {
                    name: 'yearlyGrowth',
                    title: 'Yearly Growth',
                    type: 'number',
                    description: 'Year over year growth percentage in the region.'
                },
                // {
                //     name: 'categoryGrowth',
                //     title: 'Category Growth',
                //     type: 'array',
                //     of: [{ type: 'categoryGrowth' }],
                //     description: 'Growth metrics for individual categories in the region.'
                // },
            ],
            description: 'Metrics showing the growth of the market in the region.'
        },
        // {
        //     name: 'consumerBehavior',
        //     title: 'Consumer Behavior',
        //     type: 'object',
        //     fields: [
        //         {
        //             name: 'purchasePatterns',
        //             title: 'Purchase Patterns',
        //             type: 'array',
        //             of: [{ type: 'purchasePattern' }],
        //             description: 'Patterns and trends in how consumers are making purchases.'
        //         },
        //         {
        //             name: 'brandPreferences',
        //             title: 'Brand Preferences',
        //             type: 'array',
        //             of: [{ type: 'brandPreference' }],
        //             description: 'Preferred brands in various categories.'
        //         },
        //     ],
        //     description: 'Insights into consumer buying behavior and brand preferences.'
        // },
    ]
};
