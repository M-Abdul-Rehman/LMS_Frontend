import axios from 'axios';
import { ClassData } from './classApi';
import { StudentData } from './types';

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

export interface Enrollment {
  id: string;
  student: StudentData | null;
  class: ClassData;
  status: EnrollmentStatus;
  enrolledAt: string;
}

const BASE_URL = 'http://localhost:5000/enrollments';

// Student requests enrollment
export const requestEnrollment = async (
  studentId: string,
  classId: string,
): Promise<Enrollment> => {
  const response = await axios.post(BASE_URL, {
    student: { id: studentId },
    class: { id: classId },
  });
  return response.data;
};

// Get student enrollments
export const getStudentEnrollments = async (
  studentId: string,
): Promise<Enrollment[]> => {
  const response = await axios.get(BASE_URL, {
    params: { studentId },
  });
  return response.data;
};

// Admin: Get all enrollments
export const getAllEnrollments = async (
  status?: EnrollmentStatus,
): Promise<Enrollment[]> => {
  const response = await axios.get(BASE_URL, {
    params: { status },
  });
  return response.data;
};

// Admin: Update enrollment status
export const updateEnrollmentStatus = async (
  id: string,
  status: EnrollmentStatus,
): Promise<Enrollment> => {
  const response = await axios.put(`${BASE_URL}/${id}/status`, {
    status,
  });
  return response.data;
};

// Admin: Delete enrollment
export const deleteEnrollment = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};