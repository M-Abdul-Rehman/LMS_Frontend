import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StudentData, ClassData } from '../../api/types';
import axios from 'axios';

interface AdminState {
  students: StudentData[];
  classes: ClassData[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  students: [],
  classes: [],
  loading: false,
  error: null,
};

const BASE_URL = 'https://lmsbackend-production-6d1b.up.railway.app';

export const fetchAdminStudents = createAsyncThunk(
  'admin/fetchStudents',
  async () => {
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data;
  }
);

export const fetchAdminClasses = createAsyncThunk(
  'admin/fetchClasses',
  async () => {
    const response = await axios.get(`${BASE_URL}/classes`);
    return response.data;
  }
);

export const registerStudent = createAsyncThunk(
  'admin/registerStudent',
  async (student: StudentData) => {
    const response = await axios.post(`${BASE_URL}/students`, student);
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  'admin/updateStudent',
  async ({ studentId, data }: { studentId: string; data: Partial<StudentData> }) => {
    const response = await axios.put(`${BASE_URL}/students/${studentId}`, data);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  'admin/deleteStudent',
  async (studentId: string) => {
    await axios.delete(`${BASE_URL}/students/${studentId}`);
    return studentId;
  }
);

export const registerClass = createAsyncThunk(
  'admin/registerClass',
  async (cls: Omit<ClassData, 'id'>) => {
    const response = await axios.post(`${BASE_URL}/classes`, cls);
    return response.data;
  }
);

export const updateClass = createAsyncThunk(
  'admin/updateClass',
  async ({ id, data }: { id: string; data: Partial<ClassData> }) => {
    const response = await axios.put(`${BASE_URL}/classes/${id}`, data);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk(
  'admin/deleteClass',
  async (id: string) => {
    await axios.delete(`${BASE_URL}/classes/${id}`);
    return id;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Students
      .addCase(fetchAdminStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAdminStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch students';
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s.studentId === action.payload.studentId);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s.studentId !== action.payload);
      })
      // Classes
      .addCase(fetchAdminClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchAdminClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch classes';
      })
      .addCase(registerClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(c => c.id !== action.payload);
      });
  },
});

export default adminSlice.reducer;