import { defineType, defineField } from 'sanity';

export const DETAIL_TYPE_OPTIONS = [
  { title: 'Current State', value: 'currentState' },
  { title: 'Accessories Included', value: 'accessoriesIncluded' },
  { title: 'Warranty Information', value: 'warrantyInformation' },
  { title: 'History', value: 'history' },
  { title: 'Customizations', value: 'customizations' },
  { title: 'Maintenance History', value: 'maintenanceHistory' },
  { title: 'Compatibility', value: 'compatibility' },
  { title: 'Original Packaging', value: 'originalPackaging' },
  { title: 'Usage History', value: 'usageHistory' },
  { title: 'Storage', value: 'storage' },
  { title: 'Original Purchase Date', value: 'originalPurchaseDate' },
  { title: 'Reason for Selling', value: 'reasonForSelling' },
  { title: 'Additional Features', value: 'additionalFeatures' },
  { title: 'Service Records', value: 'serviceRecords' },
  { title: 'User Manual Availability', value: 'userManualAvailability' },
  { title: 'Manufacturer Support', value: 'manufacturerSupport' },
  { title: 'Compatibility with Accessories', value: 'compatibilityWithAccessories' },
  { title: 'Packaging Condition', value: 'packagingCondition' },
  { title: 'Product History', value: 'productHistory' },
  { title: 'Transferability', value: 'transferability' },
  { title: 'Pet/Smoke Exposure', value: 'petSmokeExposure' },
  { title: 'Regulatory Compliance', value: 'regulatoryCompliance' },
  { title: 'Special Features', value: 'specialFeatures' },
  { title: 'Documentation', value: 'documentation' },
  { title: 'Certification', value: 'certification' },
  { title: 'Age', value: 'age' },
  { title: 'Ownership', value: 'ownership' },
  { title: 'Environmental Impact', value: 'environmentalImpact' },
  { title: 'Known Issues', value: 'knownIssues' },
  { title: 'Upgrades', value: 'upgrades' },
];

export const Details = defineType({
  name: 'details',
  title: 'Details',
  type: 'object',
  fields: [
    defineField({
      name: 'detailType',
      title: 'Detail Type',
      type: 'string',
      options: {
        list: DETAIL_TYPE_OPTIONS,
      },
      description: 'The type of detail being provided.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The detail value provided by the user.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      detailType: 'detailType',
      value: 'value',
    },
    prepare({ detailType, value }) {
      const option = DETAIL_TYPE_OPTIONS.find(
        (opt) => opt.value === detailType
      );

      return {
        title: option?.title ?? detailType,
        subtitle: value,
      };
    },
  },
});
