import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchAllStudents,
} from '../../api/studentApi';
import { ClassData, StudentData } from '../../api/types';
import { fetchAllClasses } from '../../api/classApi';

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

export const fetchAdminStudents = createAsyncThunk(
  'admin/fetchStudents',
  async () => {
    const response = await fetchAllStudents();
    return response;
  }
);

export const fetchAdminClasses = createAsyncThunk(
  'admin/fetchClasses',
  async () => {
    const response = await fetchAllClasses();
    return response;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default adminSlice.reducer;