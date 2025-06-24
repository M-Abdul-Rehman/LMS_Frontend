// src/api/classApi.ts
import axios from 'axios';

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

const BASE_URL = 'http://localhost:5000/classes';

export const fetchAllClasses = async (): Promise<ClassData[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching classes:', error);
    throw error.response?.data || error;
  }
};

export const registerClass = async (cls: Omit<ClassData, 'id'>): Promise<ClassData> => {
  try {
    const response = await axios.post(BASE_URL, cls);
    return response.data;
  } catch (error: any) {
    console.error('Error creating class:', error);
    throw error.response?.data || error;
  }
};

export const updateClass = async (id: string, data: Partial<ClassData>): Promise<ClassData> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating class with ID ${id}:`, error);
    throw error.response?.data || error;
  }
};

export const deleteClass = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error: any) {
    console.error(`Error deleting class with ID ${id}:`, error);
    throw error.response?.data || error;
  }
};