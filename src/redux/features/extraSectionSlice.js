import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ResumePageService from '../services/resumeService';

export const deleteSectionComponent = createAsyncThunk(
  'delete/sectionDelete',
  async (name) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const response = await ResumePageService.deleteSectionData({
        resume_token: resumeToken,
        section: name,
      });

      return response.data;
    } catch (error) {
      return error
    }
  }
);

const initialState = {
  loading: true,
  error: '',
  deleteData: '',
  extraSecArray: JSON.parse(localStorage.getItem('ext_name_arr')) || [],
};

const extraSectionSlice = createSlice({
  name: 'extraSection/extraSectionSlice',
  initialState,
  reducers: {
    arrExtSec: (state, { payload }) => {
      localStorage.setItem('ext_name_arr', JSON.stringify(payload));
      state.extraSecArray = payload;
    },
  },
  extraReducers: {
    [deleteSectionComponent.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },
    [deleteSectionComponent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.deleteData = payload;
    },
    [deleteSectionComponent.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload.error;
    },
  },
});
export const { arrExtSec } = extraSectionSlice.actions;
export default extraSectionSlice.reducer;
