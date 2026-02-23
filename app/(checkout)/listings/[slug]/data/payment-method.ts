

import type { PaymentMethod, PaymentMethodContext } from "../types/payment-types";

export type PaymentMethodType = {
  id: PaymentMethod;
  title: string;
  subtitle: string;
  descriptions?: string[];
  icons?: string[];

  path: string;
};

export const paymentMethods = [
  {
    id: "card",
    title: "Card",
    subtitle: "Visa, Mastercard",
    descriptions: [
      "Instant confirmation",
      "Funds held securely until handover",
    ],
    icons: ["/bank-logos/visa.png", "/bank-logos/mastercard.png"],
    path: "/card",
  },
  {
    id: "instant_eft",
    title: "Pay by Bank",
    subtitle: "Instant EFT",
    descriptions: [
      "All major banks supported",
      "No card required",
    ],
    icons: ["/bank-logos/absa.png", "/bank-logos/standard-bank.png", "/bank-logos/capitec.png", "/bank-logos/fnb.png"],
    path: "/instant-eft",
  },
  // {
  //   id: "eft",
  //   title: "Bank Transfer",
  //   subtitle: "Manual EFT (1–2 business days)",
  //   descriptions: [
  //     "Use your bank app or internet banking",
  //     "Payment must be confirmed before processing",
  //   ],
  //   icon: '',
  //   path: "",
  // },
  // {
  //   id: "paypal",
  //   title: "PayPal",
  //   subtitle: "Pay with PayPal",
  //   descriptions: [
  //     "Suitable for international payments",
  //     "Complete payment on PayPal",
  //   ],
  //   icon: '',
  //   path: "",
  // },
] satisfies PaymentMethodType[];


