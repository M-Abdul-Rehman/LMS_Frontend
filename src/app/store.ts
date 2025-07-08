import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import studentReducer from '../features/student/studentSlice';
import classReducer from '../features/class/classSlice';
import enrollmentReducer from '../features/enrollment/enrollmentSlice';
import adminReducer from '../features/admin/adminSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    classes: classReducer,
    enrollments: enrollmentReducer,
    admin: adminReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;