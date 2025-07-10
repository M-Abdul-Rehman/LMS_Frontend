import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ClassData, StudentData } from '../../api/types';

export type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

export interface Enrollment {
  id: string;
  student: StudentData | null;
  class: ClassData;
  status: EnrollmentStatus;
  enrolledAt: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  loading: false,
  error: null,
};

const BASE_URL = 'https://lmsbackend-production-6d1b.up.railway.app/enrollments';

export const fetchEnrollments = createAsyncThunk(
  'enrollment/fetchEnrollments',
  async (studentId: string) => {
    const response = await axios.get(BASE_URL, { 
      params: { studentStringId: studentId } // Use new param name
    });
    return response.data;
  }
);

export const enrollStudent = createAsyncThunk(
  'enrollment/requestEnrollment',
  async ({ studentId, classId }: { studentId: string; classId: string }) => {
    await axios.post(BASE_URL, { 
      studentId, 
      classId 
    });
    const response = await axios.get(BASE_URL, { params: { studentId } });
    return response.data;
  }
);

export const fetchAllEnrollments = createAsyncThunk(
  'enrollment/fetchAllEnrollments',
  async (status?: EnrollmentStatus) => {
    const response = await axios.get(BASE_URL, { params: { status } });
    return response.data;
  }
);

export const updateEnrollmentStatus = createAsyncThunk(
  'enrollment/updateStatus',
  async ({ id, status }: { id: string; status: EnrollmentStatus }) => {
    const response = await axios.put(`${BASE_URL}/${id}/status`, { status });
    return response.data;
  }
);

export const removeEnrollment = createAsyncThunk(
  'enrollment/deleteEnrollment',
  async (id: string) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrollments';
      })
      .addCase(enrollStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(enrollStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to enroll';
      })
      .addCase(fetchAllEnrollments.fulfilled, (state, action) => {
        state.enrollments = action.payload;
      })
      .addCase(updateEnrollmentStatus.fulfilled, (state, action) => {
        const index = state.enrollments.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.enrollments[index] = action.payload;
        }
      })
      .addCase(removeEnrollment.fulfilled, (state, action) => {
        state.enrollments = state.enrollments.filter(e => e.id !== action.payload);
      });
  },
});

export default enrollmentSlice.reducer;