import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: string;
  academicYear: string;
  isLoading: boolean;
}

const initialState: UIState = {
  activeTab: "dashboard",
  academicYear: "Fa2021",
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setAcademicYear: (state, action: PayloadAction<string>) => {
      state.academicYear = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setActiveTab, setAcademicYear, setIsLoading } = uiSlice.actions;
export default uiSlice.reducer;