type Reference = {
    _ref: string;
    _type: string;
};

type Image = {
    _type: 'image';
    asset: Reference;
    hotspot?: any; // Define as per your requirements for hotspot properties
};

type File = {
    _type: 'file';
    asset: Reference;
    // Include additional file properties as necessary
};

export type Upload = {
    _id: string;
    _createdAt: Date;
    image?: Image; // Optional, for image file
    video?: File; // Optional, for video file
    attachment?: File; // Optional, for general file attachments
    file: File; // General file uploaded by the user
    description: string; // Brief description of the upload
    uploadedBy: Reference; // Reference to a 'user' document
    uploadDate: string; // Date in ISO format
    tags: string[]; // Array of strings for tags
    preview?: Image; // Optional, preview image or thumbnail
    // Include any other fields as needed
};
