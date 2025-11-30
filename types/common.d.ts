// Common type definitions
export interface Image {
  id: string;
  url: string;
  alt?: string;
  aspectRatio?: number;
  width?: number;
  height?: number;
}

export interface ImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  colorSpace: PredefinedColorSpace;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
  aspectRatio?: number;
}

export interface ImageFile {
  _id: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    url?: string;
  };
}

export interface Ad {
  _id: string;
  title: string;
  description?: any;
  price?: number;
  images?: string[] | GalleryImage[];
  category?: string;
  location?: any;
  user?: any;
}

export interface FeedbackType {
  "feature-request": string;
  "bug-report": string;
  "general": string;
}

export interface Feedback {
  id: string;
  title: string;
  feedback: string;
  user?: string;
  profilePicture: string;
  date: string;
  type: keyof FeedbackType;
  status?: "open" | "in-progress" | "resolved" | "closed";
}

export interface NotificationProps {
  id: string;
  user?: string;
  email: string;
  title: string;
  description: string;
  feedback: string;
  profilePicture: string;
  date: string;
  time: string;
  listingId?: string | number;
  type: keyof FeedbackType;
  status?: "open" | "in-progress" | "resolved" | "closed";
  key: string;
}

export interface CategoriesQueryResult {
  title: string | null;
  categories: Array<{
    _id: string;
    title: string | null;
    slug: { current: string | null } | null;
    secondLevelSubcategories: Array<{
      _id: string;
      title: string | null;
      slug: { current: string | null } | null;
    }> | null;
    thirdLevelSubcategories: Array<{
      _id: string;
      title: string | null;
      slug: { current: string | null } | null;
    } | null> | null;
  }> | null;
}

export interface ErrorContext {
  field?: string;
  value?: any;
  expected?: string;
  received?: string;
}

export interface FetchStore {
  ads: any[];
  fetchAds: () => void;
  imageUrls: string[];
  hasMore: boolean;
}

export interface StepConfig<T> {
  title: string;
  content: React.ReactElement;
  fields: (keyof T)[];
}

export interface FormData {
  phoneNumber: string;
  verificationCode?: string;
  idFile?: any;
  selfie?: any;
  repIdFile?: any;
  repSelfie?: any;
  repPhoneNumber?: string;
  repVerificationCode?: string;
  province: string;
  city: string;
  suburb: string;
  postalCode: string;
  businessName: string;
  regNumber: string;
  taxNumber: string;
  street: string;
}

export interface UploadIdProps {
  onNext: () => void;
}

export interface TakeSelfieProps {
  onNext: () => void;
}

export interface EnterMobileNumberProps {
  onNext: () => void;
}

export interface SelectProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDropdownOpenChange?: (isOpen: boolean) => void;
  onBlur?: any;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  options?: Array<{ value: string | number; label: string }>;
  size?: "small" | "medium" | "large";
  variant?: "outlined" | "filled";
  className?: string;
}

export interface Props {
  id?: string;
  images?: string[];
  title?: string;
  price?: number | string;
  description?: any;
  category?: string;
  location?: any;
  aspectRatios?: number[];
  cardType?: string;
  cardSize?: "small" | "standard" | "large";
  isDeletable?: boolean;
  isChecked?: boolean;
  checkedHovered?: string;
  index?: number;
  vehicleVariant?: string;
}

export interface ImageGalleryProps {
  id: string;
  images: string[];
  aspectRatios: number[];
}