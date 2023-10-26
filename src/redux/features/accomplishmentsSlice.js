import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import resumeService from '../services/resumeService';

export const deleteAccomplishments = createAsyncThunk(
  'extraSection/deleteAccomplishment',
  async (id) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/delete-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_key: 'extra_section',
        }
      );
      localStorage.removeItem('resume_meta_value_accomplishment');
      localStorage.removeItem('AccomplishArr')
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editAccomplishments = createAsyncThunk(
  'extraSection/editAccomplishment',
  async ({ data, id }) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_sub_key: 'Accomplishment',
          meta_key: 'extra_section',
          meta_value: data,
        }
      );
      localStorage.setItem(
        'resume_meta_value_accomplishment',
        response.data.meta_value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addAccomplishment = createAsyncThunk(
  'extraSection/addAccomplishments',
  async (data) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await resumeService.saveAccomplishment({
        resume_token: resumeToken,
        resume_template_id: templateId,
        meta_sub_key: 'Accomplishment',
        meta_key: 'extra_section',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_accomplishment',
        response.data.meta_value.data
      );
      localStorage.setItem('accomplishmentId', response.data.id);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  accomplishment:
    localStorage.getItem('resume_meta_value_accomplishment') || '',
  accompResData: {},
  loading: false,
  error: '',
};

const accomplishmentSlice = createSlice({
  name: 'accomplishments',
  initialState,
  reducers: {},
  extraReducers: {
    [addAccomplishment.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addAccomplishment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.accomplishment = payload.meta_value.data;
      state.accompResData = payload;
      state.error = '';
    },
    [addAccomplishment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [editAccomplishments.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [editAccomplishments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.accomplishment = payload.meta_value;
      state.accompResData = payload;
      state.error = '';
    },
    [editAccomplishments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteAccomplishments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.accomplishment = '';
      state.accompResData = {};
      state.error = '';
    },
  },
});
export default accomplishmentSlice.reducer;
