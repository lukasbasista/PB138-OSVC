import JobCategory from './jobCategory';

type WorkLog = {
  uuid: string; // uuid
  email: string;  // email the client
  name: string;
  description?: string;
  jobCategory: JobCategory;
  timeWorked: number; // minutes
  hourRate?: number;
  currency?: string;
  total: number;
  workStart: Date;
  workEnd: Date;
  creationTime: Date;
  updatedAt?: Date;
};

export default WorkLog;
