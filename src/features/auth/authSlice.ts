import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  role: string | null;
  studentId: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  studentId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; role: string; studentId: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.studentId = action.payload.studentId;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.studentId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('student');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;