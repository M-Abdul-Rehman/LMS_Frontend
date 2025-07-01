import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/student/studentSlice';
import classReducer from '../features/class/classSlice';
import enrollmentReducer from '../features/enrollment/enrollmentSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    classes: classReducer,
    enrollments: enrollmentReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;