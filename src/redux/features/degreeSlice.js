import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';

export const getDegreeList = createAsyncThunk(
  'degree/getDegreeList',
  async () => {
    try {
      const response = await resumeService.getAll();
      return response.data;
    } catch (error) {
      return error
    }
  }
);

const degreeSlice = createSlice({
  name: 'degree',
  initialState: {
    degree: [],
    loading: '',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDegreeList.pending, (state) => {
      state.loading = 'true';
    });
    builder.addCase(getDegreeList.fulfilled, (state, { payload }) => {
      state.degree = payload.degree;
      state.loading = 'false';
    });
    builder.addCase(getDegreeList.rejected, (state, action) => {
      state.loading = 'false';
      state.error = action.error.message;
    });
  },
});
export const degreeList = (state) => state.Degrees.degree;
export default degreeSlice.reducer;
