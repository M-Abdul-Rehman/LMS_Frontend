import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getStudentEnrollments, 
  requestEnrollment, 
  Enrollment,
  EnrollmentStatus
} from '../../api/enrollmentApi';

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

export const fetchEnrollments = createAsyncThunk(
  'enrollment/fetchEnrollments',
  async (studentId: string) => {
    const response = await getStudentEnrollments(studentId);
    return response;
  }
);

export const enrollStudent = createAsyncThunk(
  'enrollment/requestEnrollment',
  async ({ studentId, classId }: { studentId: string; classId: string }) => {
    await requestEnrollment(studentId, classId);
    const enrollments = await getStudentEnrollments(studentId);
    return enrollments;
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
      });
  },
});

export default enrollmentSlice.reducer;