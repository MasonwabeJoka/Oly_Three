import { defineType, defineField } from 'sanity';

export const paymentMethod = defineType({
    name: 'paymentMethod',
    title: 'Payment Method',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user to whom this payment method belongs.'
        }),
        defineField({
            name: 'methodType',
            title: 'Method Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Credit Card', value: 'creditCard' },
                    { title: 'Debit Card', value: 'debitCard' },
                    { title: 'PayPal', value: 'paypal' },
                    { title: 'Bank Transfer', value: 'bankTransfer' },
                ],
            },
            description: 'The type of payment method.'
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'object',
            fields: [
                defineField({
                    name: 'cardNumber',
                    title: 'Card Number',
                    type: 'string',
                    description: 'The number of the credit or debit card (if applicable).'
                }),
                defineField({
                    name: 'cardHolderName',
                    title: 'Card Holder Name',
                    type: 'string',
                    description: 'The name of the cardholder (if applicable).'
                }),
                defineField({
                    name: 'expiryDate',
                    title: 'Expiry Date',
                    type: 'date',
                    description: 'The expiry date of the card (if applicable).'
                }),
                defineField({
                    name: 'securityCode',
                    title: 'Security Code',
                    type: 'string',
                    description: 'The security code of the card (if applicable).'
                }),
                // Additional fields for PayPal, Bank Transfer, etc.
            ],
            description: 'Details of the payment method.'
        }),
        defineField({
            name: 'billingAddress',
            title: 'Billing Address',
            type: 'reference',
            to: [{ type: 'address' }],
            description: 'The billing address associated with this payment method.'
        }),
        defineField({
            name: 'isDefault',
            title: 'Is Default',
            type: 'boolean',
            description: 'Indicates whether this is the user\'s default payment method.'
        }),
        defineField({
            name: 'verificationStatus',
            title: 'Verification Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Verified', value: 'verified' },
                    { title: 'Pending', value: 'pending' },
                    { title: 'Unverified', value: 'unverified' },
                ],
            },
            description: 'The verification status of the payment method.'
        }),
        defineField({
            name: 'currency',
            title: 'Preferred Currency',
            type: 'string',
            description: 'The preferred currency for transactions using this payment method.'
        }),
        defineField({
            name: 'transactionHistory',
            title: 'Transaction History',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'transaction' }] }],
            description: 'A history of transactions made using this payment method.'
        }),
        defineField({
            name: 'paymentGateway',
            title: 'Payment Gateway',
            type: 'string',
            description: 'The payment gateway or processor associated with this payment method.'
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Indicates whether this payment method is currently active and usable.'
        }),
        defineField({
            name: 'addedDate',
            title: 'Added Date',
            type: 'datetime',
            description: 'The date and time when this payment method was added to the user’s account.'
        }),
        defineField({
            name: 'additionalSettings',
            title: 'Additional Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'autoPay',
                    title: 'Auto Pay',
                    type: 'boolean',
                    description: 'Whether automatic payments are enabled for recurring charges.'
                }),
                // Additional settings specific to the payment method
            ],
            description: 'Additional settings or preferences for this payment method.'
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
            description: 'Any notes or comments about the payment method.'
        }),
        defineField({
            name: 'securityFeatures',
            title: 'Security Features',
            type: 'object',
            fields: [
                defineField({
                    name: 'fingerprint',
                    title: 'Fingerprint',
                    type: 'boolean',
                    description: 'Indicates if fingerprint verification is enabled for this payment method.'
                }),
                defineField({
                    name: 'twoFactorAuth',
                    title: 'Two-Factor Authentication',
                    type: 'boolean',
                    description: 'Whether two-factor authentication is required for transactions.'
                }),
                // Other security-related features
            ],
            description: 'Security features associated with this payment method.'
        }),
        defineField({
            name: 'limits',
            title: 'Transaction Limits',
            type: 'object',
            fields: [
                defineField({
                    name: 'dailyLimit',
                    title: 'Daily Limit',
                    type: 'number',
                    description: 'The maximum daily transaction limit.'
                }),
                defineField({
                    name: 'transactionLimit',
                    title: 'Transaction Limit',
                    type: 'number',
                    description: 'The maximum limit per transaction.'
                }),
                // Other limit-related fields
            ],
            description: 'Limits set for transactions using this payment method.'
        }),
        defineField({
            name: 'rewards',
            title: 'Rewards',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Details of any rewards or points associated with using this payment method.'
        }),
        defineField({
            name: 'expiryNotification',
            title: 'Expiry Notification',
            type: 'boolean',
            description: 'Whether the user receives notifications about the expiry of this payment method.'
        }),
        defineField({
            name: 'supportContact',
            title: 'Support Contact',
            type: 'string',
            description: 'Contact information for support related to the payment method.'
        }),
        defineField({
            name: 'customizationOptions',
            title: 'Customization Options',
            type: 'object',
            fields: [
                defineField({
                    name: 'transactionNotifications',
                    title: 'Transaction Notifications',
                    type: 'boolean',
                    description: 'Receive notifications for each transaction made using this payment method.'
                }),
                defineField({
                    name: 'paymentReminders',
                    title: 'Payment Reminders',
                    type: 'boolean',
                    description: 'Get reminders for upcoming payments or dues associated with this payment method.'
                }),
                defineField({
                    name: 'securityAlerts',
                    title: 'Security Alerts',
                    type: 'boolean',
                    description: 'Receive alerts for any unusual activity or security concerns related to this payment method.'
                }),
                defineField({
                    name: 'balanceUpdates',
                    title: 'Balance Updates',
                    type: 'boolean',
                    description: 'Get notified about the balance or credit limit changes for this payment method.'
                }),
                defineField({
                    name: 'emailNotifications',
                    title: 'Email Notifications',
                    type: 'boolean',
                    description: 'Enable or disable notifications via email for this payment method.'
                }),
                // Other customization options
            ],
            description: 'User customization options for the payment method interface.'
        }),
       
    ],
});
