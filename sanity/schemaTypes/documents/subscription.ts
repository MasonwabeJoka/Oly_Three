import { defineType, defineField } from 'sanity';

// This schema is designed to handle user subscriptions, including their details and status.
export const subscription = defineType({
    name: 'subscription',
    title: 'Subscription',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who owns the subscription.'
        }),
        defineField({
            name: 'subscriptionType',
            title: 'Subscription Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Basic', value: 'basic' },
                    { title: 'Premium', value: 'premium' },
                ],
            },
            description: 'The type of subscription.'
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'datetime',
            description: 'The date when the subscription starts.'
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'datetime',
            description: 'The date when the subscription ends.'
        }),
        defineField({
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'reference',
            to: [{ type: 'paymentMethod' }],
            description: 'The payment method used for this subscription.'
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Expired', value: 'expired' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
            },
            description: 'The current status of the subscription.'
        }),
        defineField({
            name: 'renewalReminder',
            title: 'Renewal Reminder',
            type: 'boolean',
            description: 'Whether the user receives a reminder to renew the subscription.'
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'A list of features or services included in this subscription.'
        }),
        defineField({
            name: 'billingCycle',
            title: 'Billing Cycle',
            type: 'string',
            description: 'The billing cycle for the subscription (e.g., monthly, annually).'
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'number',
            description: 'The amount charged for the subscription.'
        }),
        defineField({
            name: 'notes',
            title: 'Notes',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Any additional notes or details about the subscription.'
        }),
        defineField({
            name: 'autoRenewal',
            title: 'Auto Renewal',
            type: 'boolean',
            description: 'Indicates whether the subscription will automatically renew at the end of the billing cycle.'
        }),
        defineField({
            name: 'usageStatistics',
            title: 'Usage Statistics',
            type: 'object',
            fields: [
                defineField({
                    name: 'lastAccess',
                    title: 'Last Access',
                    type: 'datetime',
                    description: 'The last time the subscription services were accessed by the user.'
                }),
                defineField({
                    name: 'frequencyOfUse',
                    title: 'Frequency of Use',
                    type: 'number',
                    description: 'The frequency of subscription usage over a specified period.'
                }),
            ],
            description: 'Statistical data on how the user utilizes the subscription.'
        }),
        defineField({
            name: 'supportTier',
            title: 'Support Tier',
            type: 'string',
            description: 'The level of customer support associated with the subscription.'
        }),
        defineField({
            name: 'additionalBenefits',
            title: 'Additional Benefits',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Additional benefits that come with the subscription.'
        }),
        defineField({
            name: 'feedback',
            title: 'User Feedback',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Feedback provided by the user about the subscription.'
        }),
        defineField({
            name: 'upgradeOptions',
            title: 'Upgrade Options',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Available options for upgrading the current subscription, described as text.'
        }),
        
    ],
});
