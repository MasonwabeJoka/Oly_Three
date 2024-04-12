import { defineType, defineField } from 'sanity';

export const Details = defineType({
    name: 'details',
    title: 'Details',
    type: 'document',
    fields: [
 
        defineField({
            name: 'reasonForSelling',
            title: 'Reason for Selling',
            type: 'string',
            description: 'The reason why the seller is parting with the product.',
        }),
        
        defineField({
            name: 'accessoriesIncluded',
            title: 'Accessories Included',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Additional items or accessories included with the product.',
        }),
        defineField({
            name: 'warrantyInformation',
            title: 'Warranty Information',
            type: 'string',
            description: 'Details about any remaining warranty or guarantee for the product.',
        }),
        defineField({
            name: 'history',
            title: 'History',
            type: 'string',
            description: 'Relevant information about the product\'s usage or ownership history.',
        }),
        defineField({
            name: 'customizations',
            title: 'Customizations',
            type: 'string',
            description: 'Any modifications or customizations made to the product.',
        }),
        defineField({
            name: 'maintenanceHistory',
            title: 'Maintenance History',
            type: 'string',
            description: 'Records of maintenance or servicing performed on the product.',
        }),
        defineField({
            name: 'compatibility',
            title: 'Compatibility',
            type: 'string',
            description: 'Information about compatibility with other devices or systems.',
        }),
        defineField({
            name: 'originalPackaging',
            title: 'Original Packaging',
            type: 'boolean',
            description: 'Whether the product includes its original packaging.',
        }),
        defineField({
            name: 'usageHistory',
            title: 'Usage History',
            type: 'string',
            description: 'Information about how frequently or intensively the product has been used.',
        }),
        defineField({
            name: 'storage',
            title: 'Storage',
            type: 'string',
            description: 'Details about how the product has been stored.',
        }),
        defineField({
            name: 'originalPurchaseDate',
            title: 'Original Purchase Date',
            type: 'date',
            description: 'The date when the product was originally purchased.',
        }),
      

        defineField({
            name: 'serviceRecords',
            title: 'Service Records',
            type: 'string',
            description: 'Records of any repairs or servicing conducted on the product.',
        }),
        defineField({
            name: 'userManualAvailability',
            title: 'User Manual Availability',
            type: 'boolean',
            description: 'Whether the user manual or instructions for the product are available.',
        }),
        defineField({
            name: 'manufacturerSupport',
            title: 'Manufacturer Support',
            type: 'boolean',
            description: 'Information about ongoing support or services offered by the manufacturer.',
        }),
        defineField({
            name: 'compatibilityWithAccessories',
            title: 'Compatibility with Accessories',
            type: 'string',
            description: 'Details about compatibility with specific accessories or add-ons.',
        }),
        defineField({
            name: 'packagingCondition',
            title: 'Packaging Condition',
            type: 'string',
            description: 'The condition of the packaging, if included.',
        }),
        defineField({
            name: 'productHistory',
            title: 'Product History',
            type: 'string',
            description: 'Any notable events or milestones related to the product\'s development or usage.',
        }),
        defineField({
            name: 'petSmokeExposure',
            title: 'Pet/Smoke Exposure',
            type: 'string',
            description: 'Whether the product has been exposed to pets or smoke.',
        }),
        defineField({
            name: 'regulatoryCompliance',
            title: 'Regulatory Compliance',
            type: 'string',
            description: 'Information about compliance with relevant regulations or standards.',
        }),
        defineField({
            name: 'specialFeatures',
            title: 'Special Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Unique or special features of the product that may not be immediately apparent.',
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation',
            type: 'string',
            description: 'Any manuals, guides, or documentation included with the product.',
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation',
            type: 'string',
            description: 'Any manuals, guides, or documentation included with the product.',
        }),
        defineField({
            name: 'certification',
            title: 'Certification',
            type: 'string',
            description: 'Any relevant certifications or qualifications the product may have.',
        }),
        defineField({
            name: 'age',
            title: 'Age',
            type: 'string',
            description: 'The age or approximate lifespan of the product.',
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation',
            type: 'string',
            description: 'Any manuals, guides, or documentation included with the product.',
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation',
            type: 'string',
            description: 'Any manuals, guides, or documentation included with the product.',
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation',
            type: 'string',
            description: 'Any manuals, guides, or documentation included with the product.',
        }),
        defineField({
            name: 'documentation',
            title: 'Documentation',
            type: 'string',
            description: 'Any manuals, guides, or documentation included with the product.',
        }),
    ],
});
