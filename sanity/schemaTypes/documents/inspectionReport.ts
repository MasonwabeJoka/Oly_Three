// schemas/documents/inspectionReport.ts
import { defineType, defineField } from 'sanity';

export const inspectionReport = defineType({
  name: 'inspectionReport',
  title: 'Inspection Report',
  type: 'document',
  fields: [
    defineField({
      name: 'vehicle',
      title: 'Vehicle',
      type: 'reference',
      to: [{ type: 'vehicleDetails' }],
    }),
    defineField({ name: 'reportFile', title: 'Upload PDF', type: 'file' }),
    defineField({ name: 'inspectedAt', title: 'Date of Inspection', type: 'datetime' }),
    defineField({ name: 'inspectorName', title: 'Inspector Name', type: 'string' }),
    defineField({ name: 'inspectionResult', title: 'Inspection Summary', type: 'text' }),
    defineField({ name: 'source', title: 'Source (API or Manual)', type: 'string' }),
  ],
});
