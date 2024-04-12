import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type Slug = {
    _type: 'slug';
    current: string;
};

type ForegroundColour = {
    foreground: string;
}

export type Category = {
    _id: string;
    _createdAt: Date;
    slug: Slug;
    title: string;
    description: PortableTextBlock[];
    nickName?: string;
    mainCategory?: string;
    parentCategory?: Category;
    childrenCategories?: Category[];
    order?: number;
    breadCrumbs?: string[];
    featured: boolean;
    displayOrder?: number;
    image?: {
        _type: 'image';
        asset: Reference;
    };
    foreground?: ForegroundColour;
    icon?: string;
    creationDate: string; // Date in ISO format
    lastUpdated: string; // Date in ISO format
    createdBy: Reference;
    seoTitle?: PortableTextBlock[];
    seoDescription?: PortableTextBlock[];
    relatedCategories?: Reference[];
    keywords?: string[];
    visibility: 'public' | 'private';
    audience?: string;
    geographicalFocus?: string;
    averageDailyViews?: number;
    subscriberCount?: number;
    accessRestrictions?: string[];
};
