import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';

export const getWorkExperience = createAsyncThunk(
  'wrok-experience/getWorkExperience',
  async () => {
    try {
      const token = localStorage.getItem('resume_token');
      const response = await resumeService.getMetaData({
        meta_key: 'work-expr',
        resume_token: token,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addWorkExpr = createAsyncThunk(
  'work-expr/addWorkExpr',
  async ({ data, resume_token }) => {
    try {
      const details = JSON.parse(
        localStorage.getItem('resume_meta_value_workexpr')
      );
      const templateId = localStorage.getItem('templateId');


      const response = await resumeService.create({
        resume_token,
        resume_template_id: templateId,
        meta_key: 'workexpr',
        meta_value: details === null ? [data] : [...details?.meta_value, data],
      });

      localStorage.setItem(
        'resume_meta_value_workexpr',
        JSON.stringify(response.data.resume)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteJobIndex = createAsyncThunk(
  'delete/deleteJob',
  async (index) => {
    try {
      const token = localStorage.getItem('resume_token');

      const response = await resumeService.deleteJob({
        resume_token: token,
        meta_key: 'workexpr',
        meta_index: index,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const editJobData = createAsyncThunk(
  'workexpr/editJob',
  async ({ data, resume_token, jobObjectIndex }) => {
    const templateId = localStorage.getItem('templateId');

    try {
      const response = await resumeService.editJobIndexData({
        resume_token,
        resume_template_id: templateId,
        meta_index: jobObjectIndex,
        meta_key: 'workexpr',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_workexpr',
        JSON.stringify(response.data.resume)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteExprSection = createAsyncThunk(
  'education/deleteEducation',
  async () => {
    const token = localStorage.getItem('resume_token');
    try {
      const response = await resumeService.deleteSection({
        resume_token: token,
        meta_key: 'workexpr',
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// const resumeWorkExpr = localStorage.getItem('resume_meta_value_workexpr')
//   ? JSON.parse(localStorage.getItem('resume_meta_value_workexpr'))
//       ?.meta_value || []
//   : null;
const workExperienceSlice = createSlice({
  name: 'workExperienceData',

  initialState: {
    workExpr: {
      loading: false,
      error: '',
      jobsData:
        JSON.parse(localStorage.getItem('resume_meta_value_workexpr'))
          ?.meta_value || [],
    },
  },
  reducers: {},
  extraReducers: {
    [deleteJobIndex.fulfilled]: (state, { payload }) => {
      state.workExpr.jobsData = payload.resume.meta_value;
    },
    [editJobData.fulfilled]: (state, { payload }) => {
      state.workExpr.jobsData = payload.resume.meta_value;
    },
    [getWorkExperience.fulfilled]: (state, { payload }) => {
      state.workExpr = payload.resume.meta_value;
    },
    [addWorkExpr.pending]: (state, { payload }) => {
      state.workExpr.loading = true;
    },
    [addWorkExpr.fulfilled]: (state, { payload }) => {
      let arr = [];
      arr = payload?.resume?.meta_value?.pop();
      state.workExpr.jobsData.push(arr);
      state.workExpr.loading = false;
    },
    [addWorkExpr.rejected]: (state, { payload }) => {
      state.workExpr.loading = false;
      state.workExpr.error = payload.error.message;
    },
    [deleteExprSection.pending]: (state, { payload }) => {
      state.workExpr.loading = true;
    },
    [deleteExprSection.fulfilled]: (state, { payload }) => {
      state.workExpr.loading = false;
      state.workExpr.jobsData = [];
    },
    [deleteExprSection.rejected]: (state, { payload }) => {
      state.workExpr.loading = false;
      state.workExpr.error = payload.error.message;
    },
  },
});

export default workExperienceSlice.reducer;
