import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';

export const getSummary = createAsyncThunk(
  'summary/getSummary',
  async (resume_token) => {
    try {
      const response = await resumeService.getMetaData({
        meta_key: 'summary',
        resume_token,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addSummary = createAsyncThunk(
  'skills/addSummary',
  async ({ data, resume_token }) => {
    const templateId = localStorage.getItem('templateId');

    try {
      const response = await resumeService.create({
        resume_token,
        resume_template_id: templateId,
        meta_key: 'summary',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_summary',
        response.data.resume.meta_value
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteSummSection = createAsyncThunk(
  'education/deleteEducation',
  async () => {
    const token = localStorage.getItem('resume_token');
    try {
      const response = await resumeService.deleteSection({
        resume_token: token,
        meta_key: 'summary',
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const summarySlice = createSlice({
  name: 'Summary',
  initialState: {
    Summary: '' || localStorage.getItem('resume_meta_value_summary'),
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [addSummary.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addSummary.fulfilled]: (state, { payload }) => {
      state.Summary = payload.resume.meta_value;
      state.loading = false;
    },
    [addSummary.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },
    [getSummary.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getSummary.fulfilled]: (state, { payload }) => {
      state.Summary = payload;
      state.loading = false;
    },
    [getSummary.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },
    [deleteSummSection.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [deleteSummSection.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.Summary = '';
    },
    [deleteSummSection.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },
  },
});
export default summarySlice.reducer;
