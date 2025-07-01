import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllClasses, ClassData } from '../../api/classApi';

interface ClassState {
  classes: ClassData[];
  loading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
};

export const getClasses = createAsyncThunk(
  'class/fetchClasses',
  async () => {
    const response = await fetchAllClasses();
    return response;
  }
);

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch classes';
      });
  },
});

export default classSlice.reducer;