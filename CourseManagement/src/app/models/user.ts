import { Types } from "mongoose";

export type UserRole = "student" | "instructor" | "admin";

export interface User {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
  password: string;
  favCourses?: Types.ObjectId[];
  cartCourses?: Types.ObjectId[];
  taughtCourses?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
