import { z } from 'zod';

export const PortableTextBlockSchema = z.object({
  _type: z.string(), // Required type field
  style: z.string().optional(), // Optional style field (e.g., normal, heading1, heading2)
  children: z.array(z.object({
    _type: z.string(),
    text: z.string(),
    marks: z.array(z.string()).optional(), // Marks can include bold, italic, etc.
  })),
  listItem: z.string().optional(), // Optional list item type (bullet, number, etc.)
  level: z.number().optional(), // Optional list level (for nested lists)
  alignment: z.string().optional(), // Text alignment (left, center, right, justify)
  font: z.string().optional(), // Optional font family
  fontSize: z.string().optional(), // Optional font size
  color: z.string().optional(), // Optional text color
  backgroundColor: z.string().optional(), // Optional background color (highlight)
  indent: z.number().optional(), // Optional indentation level
  link: z.object({
    href: z.string(),
    target: z.string().optional(),
  }).optional(), // Optional link object
  image: z.object({
    src: z.string(),
    alt: z.string().optional(),
    title: z.string().optional(),
  }).optional(), // Optional image object
  video: z.object({
    src: z.string(),
    title: z.string().optional(),
  }).optional(), // Optional video object
  table: z.array(z.array(z.string())).optional(), // Optional table structure
  horizontalLine: z.boolean().optional(), // Optional horizontal line indicator
  emoji: z.string().optional(), // Optional emoji
  code: z.object({
    language: z.string().optional(),
    code: z.string(),
  }).optional(), // Optional code block
  blockquote: z.string().optional(), // Optional blockquote
  comment: z.array(z.object({
    author: z.string(),
    text: z.string(),
  })).optional(), // Optional comments for collaborative editing
  trackChanges: z.array(z.object({
    user: z.string(),
    change: z.string(),
  })).optional(), // Optional change tracking
}).passthrough(); // Allow additional properties

export default PortableTextBlockSchema;

type PortableTextBlock = z.infer<typeof PortableTextBlockSchema>;