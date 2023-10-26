import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';
import axios from 'axios';
export const deleteAdditionalInfo = createAsyncThunk(
  'extraSection/deleteAdditionalInfo',
  async (id) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/delete-extra-section/${id}`,
        {
          resume_token: resumeToken,
          meta_key: 'extra_section',
        }
      );
      localStorage.removeItem('resume_meta_value_additionalInfo');
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editAdditionalInfo = createAsyncThunk(
  'extraSection/editAdditionalInfo',
  async ({ data, id }) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_sub_key: 'additionalInformation',
          meta_key: 'extra_section',
          meta_value: data,
        }
      );
      localStorage.setItem(
        'resume_meta_value_additionalInfo',
        response.data.meta_value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addAdditionalInfo = createAsyncThunk(
  'extraSection/addAdditionalInfo',
  async (data) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const template_id = localStorage.getItem('templateId');

      const response = await resumeService.saveAdditionalInfo({
        resume_token: resumeToken,
        resume_template_id: template_id,
        meta_sub_key: 'additionalInformation',
        meta_key: 'extra_section',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_additionalInfo',
        response.data.meta_value.data
      );
      localStorage.setItem('additionalInfoId', response.data.id);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  loading: false,
  error: '',
  additionalInfo:
    localStorage.getItem('resume_meta_value_additionalInfo') || '',
  additionalInfoResData: {},
};

const additionalInfoSlice = createSlice({
  name: 'additional-info',
  initialState,
  reducers: {},
  extraReducers: {
    [addAdditionalInfo.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addAdditionalInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.additionalInfo = payload.meta_value.data;
      state.additionalInfoResData = payload;
    },
    [addAdditionalInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [editAdditionalInfo.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [editAdditionalInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.additionalInfo = payload.meta_value;
      state.additionalInfoResData = payload;
    },
    [editAdditionalInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteAdditionalInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.additionalInfo = '';
      state.additionalInfoResData = {};
      state.error = '';
    },
  },
});
export default additionalInfoSlice.reducer;
