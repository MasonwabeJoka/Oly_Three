

export type PaymentMethod =
  | "card"
  | "instant_eft"
  | "eft"
  | "paypal";

export type PaymentIntentStatus =
  | "created"
  | "requires_action"
  | "processing"
  | "paid"
  | "failed";

export type CreatePaymentIntentResult =
  | {
      ok: true;
      status: PaymentIntentStatus;
      redirectUrl?: string;
    }
  | {
      ok: false;
      error: string;
    };

export type PaymentMethodContext = {
  total: number;
  currency: "ZAR" | "USD";
  isInternational: boolean;
};
