import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';

export const getSkills = createAsyncThunk(
  'skilss/getSkills',
  async (resume_token) => {
    try {
      const response = await resumeService.getMetaData({
        meta_key: 'skills',
        resume_token,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addSkills = createAsyncThunk(
  'skills/addSkills',
  async ({ data, resume_token }) => {
    const templateId = localStorage.getItem('templateId');

    try {
      const response = await resumeService.create({
        resume_token,
        resume_template_id: templateId,
        meta_key: 'skills',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_skills',
       response.data.resume.meta_value
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteSkills = createAsyncThunk(
  'education/deleteEducation',
  async () => {
    const token = localStorage.getItem('resume_token');
    try {
      const response = await resumeService.deleteSection({
        resume_token: token,
        meta_key: 'skills',
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const skillsSlice = createSlice({
  name: 'Skills',
  initialState: {
    Skills: '' || localStorage.getItem('resume_meta_value_skills'),
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [addSkills.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addSkills.fulfilled]: (state, { payload }) => {
      state.Skills = payload.resume.meta_value;
      state.loading = false;
    },
    [addSkills.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },
    [getSkills.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getSkills.fulfilled]: (state, { payload }) => {
      state.Skills = payload;
      state.loading = false;
    },
    [getSkills.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },
    [deleteSkills.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [deleteSkills.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.Skills = '';
    },
    [deleteSkills.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },
    deleteSkills,
  },
});
export default skillsSlice.reducer;
