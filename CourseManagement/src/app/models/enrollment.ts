import { Types } from "mongoose";

export type ContentType = "session" | "quiz" | "assessment";
export type EnrollmentStatus = "active" | "completed" | "cancelled";

export interface ContentProgress {
  contentId: Types.ObjectId;
  type: ContentType;
  completed?: boolean;
  score?: number;
  passed?: boolean;
}

export interface SectionProgress {
  sectionId: Types.ObjectId;
  contents: ContentProgress[];
}

export interface Enrollment {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  course: Types.ObjectId;
  liveRun?: Types.ObjectId;
  basePrice: number;
  discountsApplied?: Types.ObjectId[];
  finalPrice: number;
  enrollmentDate?: Date;
  status?: EnrollmentStatus;
  progress?: number;
  sectionsProgress?: SectionProgress[];
  lastAccessed?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
