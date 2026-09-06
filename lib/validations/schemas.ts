import { z } from "zod";

/**
 * Qatar Phone Regex: Accepts +974 followed by 8 digits, or local 8 digits (starting with 3, 5, 6, 7)
 */
export const qatarPhoneRegex = /^(?:\+974|00974)?\s?[3567]\d{7}$/;

/**
 * Checkout Order Input Validation Schema
 */
export const CheckoutOrderSchema = z.object({
  customerName: z.string().min(2, "Customer name must be at least 2 characters").max(100),
  customerPhone: z
    .string()
    .min(8, "Phone number is required")
    .regex(qatarPhoneRegex, "Please enter a valid 8-digit Qatar mobile number (+974 XXXXXXXX)"),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  district: z.string().min(2, "District/Zone is required"),
  streetAddress: z.string().min(2, "Street address / building is required"),
  deliveryNotes: z.string().max(500).optional(),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "CREDIT_CARD", "QPAY", "DEBIT_CARD_QPAY", "APPLE_PAY", "COD"]),
  preferredGateway: z.enum(["TAP", "SKIPCASH", "COD"]).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().int().min(1, "Quantity must be at least 1").max(50),
        isContactLensOrder: z.boolean().optional(),
        isPlano: z.boolean().optional(),
        rightEyePower: z.number().optional(),
        leftEyePower: z.number().optional(),
      })
    )
    .min(1, "Cart cannot be empty"),
});

/**
 * Admin Authentication PIN Schema
 */
export const AdminAuthSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  pinCode: z.string().regex(/^\d{4}$/, "PIN code must be exactly 4 digits"),
});

/**
 * Multi-Store Inventory Adjustment Schema
 */
export const InventoryAdjustSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  storeId: z.string().min(1, "Store ID is required").nullable().optional(),
  newQuantity: z.number().int().min(0, "Quantity cannot be negative").optional(),
  deltaQuantity: z.number().int().optional(),
  reason: z.enum(["RESTOCK", "STOCK_COUNT", "CORRECTION", "DAMAGED", "EXPIRED", "LOST"]),
  note: z.string().max(255).optional(),
});

/**
 * Product Create / Update Schema
 */
export const ProductInputSchema = z.object({
  titleEn: z.string().min(2, "Title is required").max(200),
  titleAr: z.string().max(200).optional(),
  brandName: z.string().min(1, "Brand is required").max(100),
  basePriceQar: z.number().positive("Price must be greater than 0"),
  salePriceQar: z.number().positive().optional().nullable(),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
  productType: z.string().optional(),
});
