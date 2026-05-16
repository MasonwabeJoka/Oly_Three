// schemas/documents/jobDetails.ts
import { defineType, defineField } from 'sanity';

export const jobDetails = defineType({
  name: 'jobDetails',
  title: 'Job Details',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the job listing.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A detailed description of the job.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Temporary', value: 'temporary' },
          { title: 'Internship', value: 'internship' },
          { title: 'Remote', value: 'remote' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'salary',
      title: 'Salary (Monthly)',
      type: 'number',
      description: 'Gross monthly salary in ZAR.',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'salaryType',
      title: 'Salary Type',
      type: 'string',
      options: {
        list: [
          { title: 'Negotiable', value: 'negotiable' },
          { title: 'Fixed', value: 'fixed' },
          { title: 'Commission-based', value: 'commission' },
        ],
      },
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      description: 'Name of the hiring company.',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      description: 'Optional logo of the hiring company.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      description: 'The geographic location of the job.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'remoteAvailable',
      title: 'Remote Available?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Job Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'E.g. IT, Healthcare, Admin, Retail, etc.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Minimum qualifications required.',
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Entry Level', value: 'entry' },
          { title: 'Mid Level', value: 'mid' },
          { title: 'Senior Level', value: 'senior' },
          { title: 'Executive', value: 'executive' },
        ],
      },
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'datetime',
      description: 'Deadline for applications.',
    }),
    defineField({
      name: 'applyLink',
      title: 'Apply Link',
      type: 'url',
      description: 'External link to apply, if not using internal form.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email for inquiries or CV submission.',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: [{ type: 'user' }, { type: 'dealerProfile' }],
      description: 'The user or agency who posted the job.',
    }),
    defineField({
      name: 'listingPackage',
      title: 'Listing Package',
      type: 'reference',
      to: [{ type: 'listingPackage' }],
      description: 'Used for prioritization or monetization of job posts.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Listing?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'datePosted',
      title: 'Date Posted',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
