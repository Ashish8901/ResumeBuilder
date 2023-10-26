import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ResumePageService from '../services/resumeService';

export const getPopularSubCategories = createAsyncThunk(
  'skillsSubCategory/getSkillsSubCategories',
  async ({ title, id }) => {
    try {
      const response = await ResumePageService.getpopularjobTitlesData({
        category_id: id,
        sub_category_title: title,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const popularSubCategoriesSlice = createSlice({
  name: 'Popular Sub Categories',
  initialState: {
    popularSubCategories: { data: [], loading: false, error: '' },
  },
  reducers: {},
  extraReducers: {
    [getPopularSubCategories.pending]: (state, { payload }) => {
      state.popularSubCategories.loading = true;
    },
    [getPopularSubCategories.fulfilled]: (state, { payload }) => {
      state.popularSubCategories.data = payload.popular_sub_categories;
      state.popularSubCategories.loading = false;
    },
    [getPopularSubCategories.rejected]: (state, { payload }) => {
      state.popularSubCategories.loading = false;
      state.popularSubCategories.error = payload.error.message;
    },
  },
});

export default popularSubCategoriesSlice.reducer;
