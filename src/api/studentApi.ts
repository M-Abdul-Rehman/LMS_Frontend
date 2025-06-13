// src/api/studentApi.ts
import axios from 'axios';

export interface StudentData {
  studentId?: string;
  firstName?: string;
  lastName?: string;
  session?: string;
  department?: string;
  rollNumber?: string;
  email?: string;
  password?: string;
}

const BASE_URL = 'http://localhost:5000/students';

// 🔹 Create a student
export const registerStudent = async (student: StudentData) => {
  try {
    const response = await axios.post(BASE_URL, student);
    return response.data;
  } catch (error: any) {
    console.error('Error registering student:', error);
    throw error.response?.data || error;
  }
};

// 🔹 Get all students
export const fetchAllStudents = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching students:', error);
    throw error.response?.data || error;
  }
};

// 🔹 Get a single student by ID
export const fetchStudentById = async (studentId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${studentId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching student with ID ${studentId}:`, error);
    throw error.response?.data || error;
  }
};

// 🔹 Update a student
export const updateStudent = async (studentId: string, data: Partial<StudentData>) => {
  try {
    const response = await axios.put(`${BASE_URL}/${studentId}`, data);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating student with ID ${studentId}:`, error);
    throw error.response?.data || error;
  }
};

// 🔹 Delete a student
export const deleteStudent = async (studentId: string) => {
  try {
    await axios.delete(`${BASE_URL}/${studentId}`);
  } catch (error: any) {
    console.error(`Error deleting student with ID ${studentId}:`, error);
    throw error.response?.data || error;
  }
};
