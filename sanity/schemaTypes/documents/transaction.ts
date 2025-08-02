export const transaction = {
    name: 'transaction',
    title: 'Transaction',
    type: 'document',
    fields: [
        {
            name: 'transactionId',
            title: 'Transaction ID',
            type: 'string',
            description: 'A unique identifier for the transaction.'
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user involved in the transaction.'
        },
        {
            name: 'ads',
            title: 'Ads',
            type: 'array',
            of: [{ type:'reference', to: [{ type: 'ad' }] }],
            description: 'The ads related to the transaction, if applicable.',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'transactionType',
            title: 'Transaction Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Purchase', value: 'purchase' },
                    { title: 'Sale', value: 'sale' },
                    { title: 'Refund', value: 'refund' },
                ],
            },
            description: 'The type of transaction (e.g., purchase, sale, refund).'
        },
        {
            name: 'amount',
            title: 'Amount',
            type: 'number',
            description: 'The monetary value of the transaction.'
        },
        {
            name: 'currency',
            title: 'Currency',
            type: 'string',
            description: 'The currency in which the transaction is made.'
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'reference',
            to: [{ type: 'paymentMethod' }],
            description: 'The payment method used for the transaction.'
        },
        {
            name: 'transactionDate',
            title: 'Transaction Date',
            type: 'datetime',
            description: 'The date and time when the transaction occurred.'
        },
        {
            name: 'paymentStatus',
            title: 'Payment Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Paid', value: 'paid' },
                    { title: 'Unpaid', value: 'unpaid' },
                    { title: 'Partially Paid', value: 'partiallyPaid' },
                    { title: 'Overdue', value: 'overdue' },
                ],
            },
            description: 'The current payment status of the transaction.'
        },

      
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Completed', value: 'completed' },
                    { title: 'Failed', value: 'failed' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
            },
            description: 'The current status of the transaction.'
        },
        {
            name: 'relatedAd',
            title: 'Related Ad',
            type: 'reference',
            to: [{ type: 'ad' }],
            description: 'The ad related to the transaction, if applicable.'
        },
        {
            name: 'notes',
            title: 'Notes',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Additional notes or details about the transaction.'
        },
        {
            name: 'receipt',
            title: 'Receipt',
            type: 'file',
            description: 'A digital receipt or proof of transaction.'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Ad Purchase', value: 'adPurchase' },
                    { title: 'Subscription Fee', value: 'subscriptionFee' },
                    { title: 'Service Fee', value: 'serviceFee' },
            
                ],
            },
            description: 'The category of the transaction for better organization and reporting.'
        },
        {
            name: 'seller',
            title: 'Seller',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The seller involved in the transaction, if applicable.'
        },
        {
            name: 'buyer',
            title: 'Buyer',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The buyer involved in the transaction, if applicable.'
        },
        {
            name: 'taxDetails',
            title: 'Tax Details',
            type: 'object',
            fields: [
                {
                    name: 'amount',
                    title: 'Tax Amount',
                    type: 'number',
                    description: 'The amount of tax applied to the transaction.'
                },
                {
                    name: 'taxId',
                    title: 'Tax ID',
                    type: 'string',
                    description: 'The tax identification number or code.'
                },
                
            ],
            description: 'Details about the tax applied to the transaction.'
        },
        {
            name: 'disputeStatus',
            title: 'Dispute Status',
            type: 'string',
            options: {
                list: [
                    { title: 'None', value: 'none' },
                    { title: 'Pending', value: 'pending' },
                    { title: 'Resolved', value: 'resolved' },
                ],
            },
            description: 'The status of any dispute related to the transaction.'
        },
        {
            name: 'disputeDetails',
            title: 'Dispute Details',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Information about any dispute regarding this transaction.'
        },
        {
            name: 'refundAmount',
            title: 'Refund Amount',
            type: 'number',
            description: 'The amount refunded, if any, for the transaction.'
        },
        {
            name: 'refundDate',
            title: 'Refund Date',
            type: 'datetime',
            description: 'The date on which any refund was processed.'
        },
        {
            name: 'transactionAttachments',
            title: 'Transaction Attachments',
            type: 'array',
            of: [{ type: 'file' }],
            description: 'Attachments related to the transaction, such as invoices or contracts.'
        },
       
        {
            name: 'invoiceNumber',
            title: 'Invoice Number',
            type: 'string',
            description: 'The invoice number associated with the transaction.'
        },
        {
            name: 'paymentDueDate',
            title: 'Payment Due Date',
            type: 'datetime',
            description: 'The due date for the payment, if applicable.'
        },
        {
            name: 'paymentTerms',
            title: 'Payment Terms',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Terms and conditions related to the payment for this transaction.'
        },
        {
            name: 'paymentReceipt',
            title: 'Payment Receipt',
            type: 'file',
            description: 'A digital copy of the payment receipt.'
        },
        {
            name: 'shippingDetails',
            title: 'Shipping Details',
            type: 'object',
            fields: [
                {
                    name: 'shippingAddress',
                    title: 'Shipping Address',
                    type: 'string',
                    description: 'The address where items related to the transaction are to be shipped.'
                },
                {
                    name: 'shippingMethod',
                    title: 'Shipping Method',
                    type: 'string',
                    description: 'The method of shipping used for delivering the items.'
                },
                {
                    name: 'trackingNumber',
                    title: 'Tracking Number',
                    type: 'string',
                    description: 'The tracking number for the shipment.'
                },
                // ... other shipping-related fields
            ],
            description: 'Details about the shipping arrangements for the transaction.'
        },
        {
            name: 'cancellationReason',
            title: 'Cancellation Reason',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The reason for the cancellation of the transaction, if applicable.'
        },
      
    ],
    
};
