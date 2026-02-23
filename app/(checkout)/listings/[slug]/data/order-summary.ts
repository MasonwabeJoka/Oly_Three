



export type OrderSummaryTypes = {
  itemTitle: string;
  sellerName: string;
  sellerSubtitle?: string; // e.g. "Verified Dealer"
  phoneNumber?: string; // e.g. "082 123 4567"
  location?: string; // e.g. "East London, Eastern Cape"
  price: number; 
  total: number;
  platformFee: number;
  notes?: string[]; // optional bullets
};
export const phoneOrderSummaryMock: OrderSummaryTypes = {
  itemTitle: "Samsung Galaxy S21 (Excellent condition)",
  sellerName: "Thabo Mazinga",
  phoneNumber: "082 123 4567",
  location: "Observatory, Cape Town",
  price:9200,
  total: 9320,
  platformFee: 120,
  notes: [
    "Payment is held until you confirm receipt.",
    "You will receive a handover code after payment.",
  ],
};