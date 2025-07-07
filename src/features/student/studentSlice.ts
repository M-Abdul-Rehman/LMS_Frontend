import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { StudentData } from '../../api/types';

interface StudentState {
  student: StudentData | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  student: null,
  loading: false,
  error: null,
};

const BASE_URL = 'http://localhost:5000/students';

export const getStudent = createAsyncThunk(
  'student/fetchStudent',
  async (studentId: string) => {
    const response = await axios.get(`${BASE_URL}/${studentId}`);
    return response.data;
  }
);

export const updateStudentProfile = createAsyncThunk(
  'student/updateProfile',
  async ({ studentId, data }: { studentId: string; data: Partial<StudentData> }) => {
    const response = await axios.put(`${BASE_URL}/${studentId}`, data);
    return response.data;
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch student';
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.student = action.payload;
      });
  },
});

export default studentSlice.reducer;