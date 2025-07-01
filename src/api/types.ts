// src/api/types.ts

export interface StudentData {
  studentId: string;
  firstName: string;
  lastName: string;
  session: string;
  department: string;
  rollNumber: string;
  email: string;
  password?: string; // Keep password optional
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
