

export const upload = {
    name: 'upload',
    title: 'Upload',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'An image file associated with the upload.',
            options: {
                hotspot: true, // Useful for image cropping
            }
        },
        {
            name: 'video',
            title: 'Video',
            type: 'file',
            options: {
                accept: 'video/*',
            },
            description: 'A video file associated with the upload.'
        },
        {
            name: 'attachment',
            title: 'Attachment',
            type: 'file',
            options: {
                accept: '.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, text/plain',
            },
            description: 'General file attachments like PDFs, documents, spreadsheets, etc.'
        },
        {
            name: 'file',
            title: 'File',
            type: 'file',
            options: {
                accept: 'image/*, application/pdf, audio/*, video/*, text/plain',
            },
            description: 'The file uploaded by the user.'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description of the upload.'
        },
        {
            name: 'uploadedBy',
            title: 'Uploaded By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who uploaded the file.'
        },
        {
            name: 'uploadDate',
            title: 'Upload Date',
            type: 'datetime',
            description: 'The date and time when the file was uploaded.'
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Tags to categorize or describe the file.'
        },
        {
            name: 'preview',
            title: 'Preview',
            type: 'image',
            description: 'A preview image or thumbnail for the file, if applicable.'
        },
        // ... other relevant fields ...
    ],
};





