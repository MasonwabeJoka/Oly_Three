import { PortableTextBlock } from "sanity";

type Image = {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    hotspot?: any; // Define as per your requirements
};

export type Slide = {
    image: Image;
    text: PortableTextBlock[]; // Text content in Portable Text format
    // Include any other fields as needed
};
