export interface StudentData {
  studentId: string;
  firstName: string;
  lastName: string;
  session: string;
  department: string;
  rollNumber: string;
  email: string;
  password?: string;
}

export interface ClassData {
  id: string;
  title: string;
  code: string;
  semester: string;
  session: string;
  department: string;
  instructorId?: string;
  createdAt?: string;
}

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

export interface Enrollment {
  id: string;
  student: StudentData | null;
  class: ClassData;
  status: EnrollmentStatus;
  enrolledAt: string;
}