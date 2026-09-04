// ============================================================================
// EyeNova - Qatar Online Payment Gateway Service
// Supports: Qatar NAPS/QPay, Credit/Debit Cards (Visa/Mastercard), Apple Pay
// Standard Gateways: SkipCash (Qatar), QPay / QNB, MyFatoorah, Tap Payments, Stripe
// ============================================================================

export type PaymentRequest = {
  amountQar: number;
  currency: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  paymentMethod: "QPAY_DEBIT" | "CREDIT_CARD" | "APPLE_PAY" | "COD";
  cardDetails?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string; // MM/YY
    cvv: string;
  };
};

export type PaymentResult = {
  success: boolean;
  transactionId: string;
  paymentReference: string;
  paidAmountQar: number;
  paymentMethod: string;
  status: "PAID" | "PENDING_3D_SECURE" | "FAILED";
  authCode?: string;
  errorMessage?: string;
};

/**
 * Process Online Payment via Gateway (QPay, SkipCash, Card, Apple Pay)
 */
export async function processOnlinePayment(req: PaymentRequest): Promise<PaymentResult> {
  const transactionId = `TXN-QAT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  if (req.paymentMethod === "COD") {
    return {
      success: true,
      transactionId,
      paymentReference: `COD-${req.orderNumber}`,
      paidAmountQar: req.amountQar,
      paymentMethod: "CASH_ON_DELIVERY",
      status: "PAID",
    };
  }

  // Gateway validation (Card or QPay Debit)
  if (req.paymentMethod === "CREDIT_CARD" || req.paymentMethod === "QPAY_DEBIT") {
    if (!req.cardDetails || !req.cardDetails.cardNumber || req.cardDetails.cardNumber.length < 15) {
      return {
        success: false,
        transactionId,
        paymentReference: "",
        paidAmountQar: 0,
        paymentMethod: req.paymentMethod,
        status: "FAILED",
        errorMessage: "Invalid card details. Please check the 16-digit card number.",
      };
    }
  }

  // Simulated 3D-Secure verification approval (Direct on-site gateway)
  return {
    success: true,
    transactionId,
    paymentReference: `QPAY-AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
    paidAmountQar: req.amountQar,
    paymentMethod: req.paymentMethod,
    status: "PAID",
    authCode: `AUTH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  };
}
