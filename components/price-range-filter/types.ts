import {
  SearchParams,
  ProductType,
  Currency,
  PriceRange,
} from "@/lib/price-range";

/**
 * Props for the main PriceRangeFilter component
 */
export interface PriceRangeFilterProps {
  searchParams: SearchParams;
  productType: ProductType;
  currency: Currency;
  onRangeSelect: (ranges: string[]) => void;
  selectedRanges: string[];
  className?: string;
}

/**
 * State for filter management
 */
export interface FilterState {
  selectedPriceRanges: string[];
  availableRanges: PriceRange[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Zustand store interface for global filter state
 */
export interface FilterStore extends FilterState {
  selectRange: (rangeId: string) => void;
  deselectRange: (rangeId: string) => void;
  clearAllRanges: () => void;
  updateAvailableRanges: (ranges: PriceRange[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}
