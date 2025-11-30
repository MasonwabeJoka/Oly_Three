import { defineType, defineField } from 'sanity';

export const jobListing = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  initialValue: {
    title: 'New Job Opening',
    site: 'oly-hiring',
    isFeatured: false,
    isActive: true,
    employmentType: 'full-time',
    remoteOption: 'on-site',
    currency: 'USD',
    pricingOption: 'standard',
    approvedForListing: 'approved',
    postedOn: () => new Date().toISOString(),
    expiresAt: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 0,
    todaysViews: 0,
    totalViews: 0,
    unreadMessages: 0,
    openPositions: 1,
    salary: { negotiable: false, frequency: 'annually' },
  },
  fields: [
    // Core Metadata
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'The title of the job opening (e.g., "Senior Software Engineer", "Marketing Manager").',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
      description: 'A unique, human-readable identifier for the job listing URL.',
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description of the job responsibilities, requirements, and company culture.',
      validation: (Rule) =>
        Rule.required().min(200).max(3000).warning('Job description should ideally be between 200 and 3000 characters.'),
    }),
    defineField({
      name: 'category',
      title: 'Job Category',
      type: 'reference',
      to: [{ type: 'jobCategory' }],
      description: 'The category under which this job listing falls (e.g., Software Development, Marketing, Healthcare).',
    }),

    // Job-Specific Attributes
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      description: 'The name of the company posting the job.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyWebsite',
      title: 'Company Website',
      type: 'url',
      description: 'The official website of the company.',
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
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'The type of employment offered (e.g., Full-time, Internship).',
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Entry Level', value: 'entry-level' },
          { title: 'Associate', value: 'associate' },
          { title: 'Mid-Senior Level', value: 'mid-senior' },
          { title: 'Director', value: 'director' },
          { title: 'Executive', value: 'executive' },
        ],
      },
      description: 'The required experience level for the role.',
    }),
    defineField({
      name: 'educationLevel',
      title: 'Education Level',
      type: 'string',
      options: {
        list: [
          { title: 'High School', value: 'high-school' },
          { title: 'Associate Degree', value: 'associate-degree' },
          { title: "Bachelor's Degree", value: 'bachelors-degree' },
          { title: "Master's Degree", value: 'masters-degree' },
          { title: 'Doctorate', value: 'doctorate' },
          { title: 'Vocational', value: 'vocational' },
          { title: 'Not Specified', value: 'not-specified' },
        ],
      },
      description: 'The preferred or required education level.',
    }),
    defineField({
      name: 'remoteOption',
      title: 'Remote Option',
      type: 'string',
      options: {
        list: [
          { title: 'On-site', value: 'on-site' },
          { title: 'Remote', value: 'remote' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
      },
      initialValue: 'on-site',
      description: 'Whether the job is on-site, fully remote, or hybrid.',
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
      description: 'Direct URL where candidates can apply for the job.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Health Insurance', value: 'health-insurance' },
          { title: 'Paid Time Off', value: 'pto' },
          { title: '401k Matching', value: '401k-matching' },
          { title: 'Flexible Hours', value: 'flexible-hours' },
          { title: 'Remote Work Options', value: 'remote-work-options' },
          { title: 'Professional Development', value: 'professional-development' },
          { title: 'Relocation Assistance', value: 'relocation-assistance' },
        ],
        layout: 'tags',
      },
      description: 'Key benefits offered with this position.',
    }),
    defineField({
      name: 'seniorityLevel',
      title: 'Seniority Level',
      type: 'string',
      options: {
        list: [
          { title: 'Internship', value: 'internship' },
          { title: 'Entry-level', value: 'entry-level' },
          { title: 'Junior', value: 'junior' },
          { title: 'Mid-level', value: 'mid-level' },
          { title: 'Senior', value: 'senior' },
          { title: 'Lead/Principal', value: 'lead-principal' },
          { title: 'Manager', value: 'manager' },
          { title: 'Director', value: 'director' },
          { title: 'Executive', value: 'executive' },
        ],
      },
      description: 'The seniority level of the role.',
    }),
    defineField({
      name: 'hiringTeam',
      title: 'Hiring Team Members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
      description: 'References to users who are part of the hiring team for this role.',
    }),
    defineField({
      name: 'openPositions',
      title: 'Number of Open Positions',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.min(1),
      description: 'The number of identical positions currently open.',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of required skills, qualifications, and experience.',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key responsibilities for the role.',
    }),
    defineField({
      name: 'details',
      title: 'Key Details',
      type: 'array',
      of: [{ type: 'details' }],
      description: 'Other key details or perks not covered by specific fields.',
    }),

    // User and Status Information
    defineField({
      name: 'user',
      title: 'Recruiter/Hiring Manager',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who posted this job ad (e.g., recruiter, hiring manager).',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'The website section this job ad belongs to.',
      initialValue: 'oly-hiring',
      readOnly: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Is this job listing currently active and visible?',
    }),
    defineField({
      name: 'approvedForListing',
      title: 'Approved For Listing',
      type: 'string',
      description: 'The status indicating whether the job is approved for listing.',
      options: {
        list: [
          { title: 'Approved', value: 'approved' },
          { title: 'Pending', value: 'pending' },
          { title: 'Denied', value: 'denied' },
        ],
      },
      initialValue: 'approved',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Listing',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this listing is featured.',
    }),

    // Salary and Payment Details
    defineField({
      name: 'salary',
      title: 'Salary Range',
      type: 'object',
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum Salary',
          type: 'number',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'max',
          title: 'Maximum Salary',
          type: 'number',
          validation: (Rule: any) => Rule.min(0),
        }),
        defineField({
          name: 'frequency',
          title: 'Frequency',
          type: 'string',
          options: {
            list: ['hourly', 'daily', 'weekly', 'bi-weekly', 'monthly', 'annually'],
          },
          initialValue: 'annually',
        }),
        defineField({
          name: 'negotiable',
          title: 'Negotiable',
          type: 'boolean',
          initialValue: false,
          description: 'Is the salary negotiable?',
        }),
      ],
      description: 'The expected salary range for this position.',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [
          { title: 'ZAR', value: 'ZAR' },
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' },
        ],
      },
      description: 'The currency in which the salary is quoted.',
    }),
    defineField({
      name: 'pricingOption',
      title: 'Posting Option',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Post', value: 'standard' },
          { title: 'Premium Post', value: 'premium' },
          { title: 'Free Post', value: 'free' },
        ],
      },
      description: 'The type of job posting package selected.',
      initialValue: 'standard',
      hidden: true,
    }),
    defineField({
      name: 'priceId',
      title: 'Price ID',
      type: 'string',
      description: 'The price ID associated with this job posting (if there is a fee to post).',
      hidden: true,
    }),
    defineField({
      name: 'paystackId',
      title: 'Paystack ID',
      type: 'string',
      description: 'The Paystack ID associated with this product (if a payment was made).',
      readOnly: true,
      hidden: true,
    }),

    // Media Fields
    defineField({
      name: 'avatar',
      title: 'Company Logo',
      type: 'reference',
      to: [{ type: 'imageFile' }],
      options: {
        filter: '_type == "imageFile"',
      },
      description: 'The main logo for the company posting the job.',
    }),
    defineField({
      name: 'images',
      title: 'Company Images',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'imageFile' }],
          options: {
            metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
            filter: ({ context }: any) => {
              const currentUserId = context.currentUser?.id;
              return {
                filter: '_id == $userId',
                params: { userId: currentUserId },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(10).warning('Keep company image count reasonable.'),
      description: 'Images showcasing the company culture, office space, or team.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'string',
      description: 'Select the primary image (e.g., company logo or a banner) for this job listing.',
    }),
    defineField({
      name: 'videos',
      title: 'Company/Job Videos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'videoFile' }],
          options: {
            metadata: [
              'duration',
              'format',
              'resolution',
              'fileSize',
              'aspectRatio',
              'creationDate',
              'frameRate',
              'bitrate',
              'codec',
              'audioChannels',
              'tags',
            ],
            filter: ({ context }: any) => {
              const currentUserId = context.currentUser?.id;
              return {
                filter: '_id == $userId',
                params: { userId: currentUserId },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(2),
      description: 'Videos showcasing company culture, a day in the life, or the team.',
    }),
    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'attachment' }],
          options: {
            metadata: ['size', 'format', 'creationDate', 'modifiedDate', 'author', 'pageCount', 'title', 'tags'],
            filter: ({ context }: any) => {
              const currentUserId = context.currentUser?.id;
              return {
                filter: '_id == $userId',
                params: { userId: currentUserId },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Additional documents like benefits guides or detailed role descriptions.',
    }),

    // Location
    defineField({
      name: 'location',
      title: 'Job Location',
      type: 'location',
      description: 'The specific geographical location of the job, or "Remote".',
    }),

    // Engagement and Promotion
    defineField({
      name: 'promotions',
      title: 'Promotions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Oly', value: 'oly' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Google Ads', value: 'google-ads' },
                  { title: 'LinkedIn Ads', value: 'linkedin-ads' },
                  { title: 'Indeed', value: 'indeed' },
                  { title: 'Glassdoor', value: 'glassdoor' },
                ],
              },
              description: 'The platform where the job ad is being promoted.',
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              options: {
                list: [
                  { title: '7 Days', value: '7days' },
                  { title: '2 Weeks', value: '2weeks' },
                  { title: '1 Month', value: '1month' },
                  { title: '2 Months', value: '2months' },
                ],
              },
              description: 'Chosen duration for the ad promotion on this platform.',
            }),
            defineField({
              name: 'remainingDays',
              title: 'Remaining Days',
              type: 'number',
              description: 'The number of days remaining for the promotion on this platform.',
            }),
          ],
          description: 'Details of the ad promotion on a specific platform, including the duration and remaining days.',
        },
      ],
      description: 'Information about the promotion of the job ad on various platforms.',
    }),
    defineField({
      name: 'likes',
      title: 'Likes/Bookmarks',
      type: 'number',
      description: 'The number of times the job ad has been liked or bookmarked by users.',
      initialValue: 0,
    }),
    defineField({
      name: 'todaysViews',
      title: "Today's Views",
      type: 'number',
      description: 'The number of views the job ad has received in the last 24 hours.',
      initialValue: 0,
    }),
    defineField({
      name: 'totalViews',
      title: 'Total Views',
      type: 'number',
      description: 'The total number of views on this job ad.',
      initialValue: 0,
    }),
    defineField({
      name: 'unreadMessages',
      title: 'Unread Messages',
      type: 'number',
      description: 'The number of unread messages related to this job ad (e.g., inquiries).',
      initialValue: 0,
    }),

    // Timestamps
    defineField({
      name: 'postedOn',
      title: 'Posted On',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      initialValue: () => new Date().toISOString(),
      description: 'The date and time when this job listing was first posted.',
    }),
    defineField({
      name: 'expiresAt',
      title: 'Application Deadline',
      type: 'datetime',
      initialValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'The date and time when applications for this job will close.',
    }),

    // Irrelevant Fields (Hidden)
    defineField({
      name: 'condition',
      title: 'Irrelevant Field',
      type: 'string',
      description: 'This field is not relevant for a job ad and should ideally be removed.',
      hidden: true,
    }),
    defineField({
      name: 'quantity',
      title: 'Irrelevant Field',
      type: 'number',
      description: 'This field is not relevant for a job ad and should ideally be removed.',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
      location: 'location.address.city',
      employmentType: 'employmentType',
      minSalary: 'salary.min',
      maxSalary: 'salary.max',
      salaryCurrency: 'currency',
      salaryFrequency: 'salary.frequency',
      media: 'avatar',
      status: 'approvedForListing',
    },
    prepare(selection) {
      const {
        title,
        company,
        location,
        employmentType,
        minSalary,
        maxSalary,
        salaryCurrency,
        salaryFrequency,
        media,
        status,
      } = selection;

      const subtitleParts = [];
      if (company) subtitleParts.push(company);
      if (location) subtitleParts.push(location);
      if (employmentType) subtitleParts.push(employmentType.replace(/-/g, ' '));

      let salaryText = '';
      if (minSalary && maxSalary) {
        salaryText = `${salaryCurrency || ''} ${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()} ${salaryFrequency || ''}`;
      } else if (minSalary) {
        salaryText = `From ${salaryCurrency || ''} ${minSalary.toLocaleString()} ${salaryFrequency || ''}`;
      } else if (maxSalary) {
        salaryText = `Up to ${salaryCurrency || ''} ${maxSalary.toLocaleString()} ${salaryFrequency || ''}`;
      }

      if (salaryText) subtitleParts.push(salaryText);

      return {
        title: title || 'Untitled Job Ad',
        subtitle: `${subtitleParts.filter(Boolean).join(' | ')} (${status || 'N/A'})`,
        media: media,
      };
    },
  },
});