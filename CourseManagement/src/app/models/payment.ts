import { Types } from "mongoose";

export interface Payment {
  _id?: Types.ObjectId;
  enrollment: Types.ObjectId;
  amount: number;
  currency: "EGP" | "USD" | "EUR" | "SAR" | "KWD" | "GBP" | "BHR" | "AED";
  method: "credit_card" | "paypal" | "stripe" | "bank_transfer";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
  paymentDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
