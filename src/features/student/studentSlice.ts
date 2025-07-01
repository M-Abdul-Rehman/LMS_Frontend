import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudentById } from '../../api/studentApi';
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

export const getStudent = createAsyncThunk(
  'student/fetchStudent',
  async (studentId: string) => {
    const response = await fetchStudentById(studentId);
    return response;
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
      });
  },
});

export default studentSlice.reducer;