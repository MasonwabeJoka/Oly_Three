import { defineType, defineField } from 'sanity';

export const flaggedContent = defineType({
  name: 'flaggedContent',
  title: 'Flagged Content',
  type: 'document',
  description: 'Tracks content flagged by users or systems for moderation across sites.',
  fields: [
    defineField({
      name: 'contentId',
      title: 'Content',
      type: 'reference',
      to: [{ type: 'listing' }, { type: 'review' }, { type: 'message' }],
      description: 'The referenced content flagged for review.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'snapshot',
      title: 'Content Snapshot',
      type: 'text',
      description:
        'Optional snapshot of the content at the time of flagging (e.g., in case it gets edited or deleted).',
    }),

    defineField({
      name: 'flagType',
      title: 'Flag Type',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Automated', value: 'automated' },
        ],
      },
      initialValue: 'manual',
      description: 'Whether the flag was raised by a user or detected by a system.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'reason',
      title: 'Reason',
      type: 'string',
      description:
        'Reason for flagging (e.g., scam, hate speech, spam, adult content, misleading info, duplicate).',
      validation: (Rule) => Rule.required().max(500),
    }),

    defineField({
      name: 'flaggedBy',
      title: 'Flagged By',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'User who flagged the content (only applicable for manual flags).',
    }),

    defineField({
      name: 'automatedDetectionMetadata',
      title: 'Automated Detection Metadata',
      type: 'object',
      hidden: ({ parent }) => parent?.flagType !== 'automated',
      fields: [
        defineField({
          name: 'detectedBy',
          title: 'Detected By',
          type: 'string',
          description: 'Which system or rule flagged the content (e.g., keyword scanner, AI moderation).',
        }),
        defineField({
          name: 'confidenceScore',
          title: 'Confidence Score',
          type: 'number',
          description: 'Score indicating confidence in detection (0 to 1)',
          validation: (Rule) => Rule.min(0).max(1),
        }),
      ],
    }),

    defineField({
      name: 'date',
      title: 'Flagged At',
      type: 'datetime',
      description: 'Date and time when the content was flagged.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Under Review', value: 'under_review' },
          { title: 'Resolved', value: 'resolved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'severity',
      title: 'Severity',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
        ],
      },
      description: 'Moderation priority/severity of the issue.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'resolutionAction',
      title: 'Resolution Action',
      type: 'string',
      options: {
        list: [
          { title: 'Removed', value: 'removed' },
          { title: 'Edited', value: 'edited' },
          { title: 'Approved', value: 'approved' },
          { title: 'No Action', value: 'no_action' },
          { title: 'Escalated', value: 'escalated' },
        ],
      },
      description: 'Outcome of the moderation process.',
    }),

    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'Moderator/admin who reviewed the content.',
    }),

    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'datetime',
      description: 'When the review was completed.',
    }),

    defineField({
      name: 'notes',
      title: 'Moderator Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes added by the reviewing moderator.',
    }),

    defineField({
      name: 'escalatedTo',
      title: 'Escalated To',
      type: 'string',
      description: 'Who the case was escalated to (e.g., legal team, senior moderator).',
    }),

    defineField({
      name: 'reviewLog',
      title: 'Review Log',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'action', title: 'Action', type: 'string' },
            { name: 'timestamp', title: 'Time', type: 'datetime' },
            { name: 'by', title: 'Performed By', type: 'reference', to: [{ type: 'user' }] },
            { name: 'note', title: 'Note', type: 'text' },
          ],
        },
      ],
      description: 'Audit trail of moderation actions on this flag.',
    }),

    defineField({
      name: 'relatedFlags',
      title: 'Related Flags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'flaggedContent' }] }],
      description: 'Other flag records related to this content (e.g., duplicate reports).',
    }),

    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: [
          { title: 'OLY', value: 'oly' },
          { title: 'Oly Properties', value: 'oly-properties' },
          { title: 'Oly Auto', value: 'oly-auto' },
          { title: 'Oly Hiring', value: 'oly-hiring' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
