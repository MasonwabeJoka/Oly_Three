// Temporary Ad type for build compatibility
export interface Ad {
  id: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: any[];
  createdAt: string;
  updatedAt: string;
}

// Placeholder schema for validation
export const AdSchema = {
  title: { required: true, type: 'string' },
  description: { required: true, type: 'string' },
  price: { required: true, type: 'number' },
  category: { required: true, type: 'string' },
  images: { required: false, type: 'array' },
};

export default Ad;
