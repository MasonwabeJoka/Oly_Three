import { defineType, defineField } from 'sanity';

export const coupon = defineType({
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Coupon Code',
      type: 'string',
      validation: Rule => Rule.required().uppercase().min(3).max(20),
      description: 'The unique coupon code for users to enter (e.g. OLY20).',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short internal or public-facing explanation of the coupon.',
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage', value: 'percentage' },
          { title: 'Fixed Amount', value: 'fixed' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      initialValue: 'percentage',
      description: 'Choose whether the discount is a percentage or fixed amount.',
    }),
    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      validation: Rule => Rule.required().positive(),
      description: 'E.g. 10% or R50 — based on the discount type selected.',
    }),
    defineField({
      name: 'minOrderAmount',
      title: 'Minimum Order Amount',
      type: 'number',
      description: 'Optional. Minimum order value for coupon to be valid.',
    }),
    defineField({
      name: 'maxDiscountValue',
      title: 'Maximum Discount Value',
      type: 'number',
      hidden: ({ parent }) => parent?.discountType !== 'percentage',
      description: 'Cap the value of percentage discounts (e.g., max R200 off).',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'The date the coupon becomes valid.',
    }),
    defineField({
      name: 'expirationDate',
      title: 'Expiration Date',
      type: 'datetime',
      description: 'The date the coupon expires.',
    }),
    defineField({
      name: 'usageLimit',
      title: 'Total Usage Limit',
      type: 'number',
      description: 'How many times can this coupon be used in total (site-wide)?',
    }),
    defineField({
      name: 'usageLimitPerUser',
      title: 'Usage Limit Per User',
      type: 'number',
      description: 'How many times can a single user use this coupon?',
    }),
    defineField({
      name: 'applicableSites',
      title: 'Applicable Sites',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Oly', value: 'oly' },
          { title: 'Oly Auto', value: 'oly-auto' },
          { title: 'Oly Properties', value: 'oly-properties' },
          { title: 'Oly Hiring', value: 'oly-hiring' },
          { title: 'Oly Services', value: 'oly-services' },
        ],
      },
      description: 'On which site(s) this coupon can be redeemed.',
    }),
    defineField({
      name: 'listingPackages',
      title: 'Applicable Listing Packages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'listingPackage' }] }],
      description: 'Optional. Limit coupon to specific listing packages.',
    }),
    defineField({
      name: 'firstTimeUsersOnly',
      title: 'First-Time Users Only',
      type: 'boolean',
      initialValue: false,
      description: 'Restrict coupon to users who have never posted a listing.',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
      description: 'Control whether the coupon is currently valid or not.',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
      description: 'Visible only to admins. Track special terms or intentions.',
    }),
  ],
  preview: {
    select: {
      title: 'code',
      subtitle: 'description',
    },
  },
});
