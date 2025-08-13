import { Types } from "mongoose";

export interface AssessmentDeliverable {
  name: string;
  fileUrl?: string;
  instructions?: string;
}

export interface Assessment {
  title: string;
  description: string;
  deliverables: AssessmentDeliverable[];
  dueDate?: Date;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  order: number;
}

export interface Quiz {
  title: string;
  questions: Question[];
  passingScore?: number;
}

export interface CourseQuestion {
  question: Question;
  appearTime: number; // in seconds
}

export interface Material {
  title: string;
  fileUrl: string;
}

export interface Session {
  session_title: string;
  duration: number; // in minutes
  content: string;
  recordingUrl?: string;
  questions?: CourseQuestion[];
  materials?: Material[];
}

export type SectionContentType = "session" | "quiz" | "assessment";

export interface SectionContent {
  type: SectionContentType;
  order: number;
  session?: Session;
  quiz?: Quiz;
  assessment?: Assessment;
}

export interface Section {
  title: string;
  contents: SectionContent[];
  order: number;
}

export type InstructorRole = "owner" | "lecturer" | "assistant" | "guest";

export interface Instructor {
  user: Types.ObjectId | string;
  role: InstructorRole;
}

export type Department =
  | "Computer Science"
  | "Engineering"
  | "Business"
  | "Math"
  | "Language"
  | "Other";

export type CourseStatus =
  | "Not Started"
  | "Planning"
  | "Content Creation"
  | "Review"
  | "Completed";

export interface CourseRatingReview {
  user: Types.ObjectId | string;
  score: number;
  comment?: string;
}

export interface CourseRating {
  average: number;
  count: number;
  reviews: CourseRatingReview[];
}

export interface Course {
  _id?: Types.ObjectId;
  name: string;
  thumbnail?: string;
  bannerImage?: string;
  description: string;
  instructors: Instructor[];
  department: Department;
  status?: CourseStatus;
  curriculum?: Section[];
  rating?: CourseRating;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
