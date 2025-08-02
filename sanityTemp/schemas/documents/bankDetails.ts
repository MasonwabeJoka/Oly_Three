import { defineType, defineField } from 'sanity'

export const bankDetails = defineType({
  name: 'bankDetails',
  title: 'Bank Details',
  type: 'object', 
  fields: [
    defineField({
      name: 'bankName',
      title: 'Bank Name',
      type: 'string',
      description: 'The name of the bank associated with the account.',
      validation: (Rule) => Rule.required().min(1).warning('Bank name is required'),
    }),
    defineField({
      name: 'accountHolderName',
      title: 'Account Holder Name',
      type: 'string',
      description: 'The name of the account holder.',
      validation: (Rule) => Rule.required().min(1).warning('Account holder name is required'),
    }),
    defineField({
      name: 'accountNumber',
      title: 'Account Number',
      type: 'string',
      description: 'The bank account number.',
      validation: (Rule) => Rule.required().min(1).warning('Account number is required'),
    }),
    defineField({
      name: 'branchCode',
      title: 'Branch Code',
      type: 'string',
      description: 'The branch code of the bank.',
      validation: (Rule) => Rule.required().min(1).warning('Branch code is required'),
    }),
    defineField({
      name: 'bankCode',
      title: 'Bank Code',
      type: 'string',
      description: 'The code of the bank.',
    }),
    defineField({
      name: 'swiftCode',
      title: 'SWIFT Code',
      type: 'string',
      description: 'The SWIFT code of the bank.',
    }),
  ],
})
