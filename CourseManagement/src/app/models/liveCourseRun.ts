import { Types } from "mongoose";

export interface LiveSession {
  contentId: Types.ObjectId;
  sectionId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  meetingLink?: string;
  description?: string;
}

export interface LiveCourseRun {
  _id?: Types.ObjectId;
  course: Types.ObjectId;
  startDate: Date;
  endDate?: Date;
  liveSessions: LiveSession[];
  createdAt?: Date;
  updatedAt?: Date;
}
