import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const getClasses = createAsyncThunk(
  'class/fetchClasses',
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const registerClass = createAsyncThunk(
  'class/registerClass',
  async (cls: Omit<ClassData, 'id'>) => {
    const response = await axios.post(BASE_URL, cls);
    return response.data;
  }
);

export const updateClass = createAsyncThunk(
  'class/updateClass',
  async ({ id, data }: { id: string; data: Partial<ClassData> }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk(
  'class/deleteClass',
  async (id: string) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Classes
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
      })
      // Register Class
      .addCase(registerClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      // Update Class
      .addCase(updateClass.fulfilled, (state, action) => {
        const index = state.classes.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      // Delete Class
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(c => c.id !== action.payload);
      });
  },
});

export default classSlice.reducer;