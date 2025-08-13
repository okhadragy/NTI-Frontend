import { Types } from "mongoose";

export type DiscountType = "percentage" | "fixed";

export interface Discount {
  _id?: Types.ObjectId;
  code: string;
  type: DiscountType;
  value: number;
  startDate?: Date;
  endDate?: Date;
  usageLimit?: number; // null = unlimited
  usedCount?: number;
  courses?: Types.ObjectId[]; // empty array means all courses
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
