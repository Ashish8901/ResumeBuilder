import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';
import axios from 'axios';
export const deleteHobbiesInfo = createAsyncThunk(
  'extraSection/deleteHobbiesInfo',
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
      localStorage.removeItem('resume_meta_value_hobbiesInfo');
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editHobbiesInfo = createAsyncThunk(
  'extraSection/editHobbiesInfo',
  async ({ data, id }) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_sub_key: 'hobbiesInformation',
          meta_key: 'extra_section',
          meta_value: data,
        }
      );
      localStorage.setItem(
        'resume_meta_value_hobbiesInfo',
        response.data.meta_value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addHobbiesInfo = createAsyncThunk(
  'extraSection/addHobbiesInfo',
  async (data) => {
    console.log('dfjbdshfbb');
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const template_id = localStorage.getItem('templateId');

      const response = await resumeService.saveHobbiesInfo({
        resume_token: resumeToken,
        resume_template_id: template_id,
        meta_sub_key: 'hobbiesInformation',
        meta_key: 'extra_section',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_hobbiesInfo',
        response.data.meta_value.data
      );
      localStorage.setItem('hobbiesInfoId', response.data.id);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  loading: false,
  error: '',
  HobbiesInfo: localStorage.getItem('resume_meta_value_hobbiesInfo') || '',
  hobbiesInfoResData: {},
};

const hobbiesInfoSlice = createSlice({
  name: 'hobbies-info',
  initialState,
  reducers: {},
  extraReducers: {
    [addHobbiesInfo.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addHobbiesInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.HobbiesInfo = payload.meta_value.data;
      state.hobbiesInfoResData = payload;
    },
    [addHobbiesInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [editHobbiesInfo.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [editHobbiesInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.HobbiesInfo = payload.meta_value;
      state.HobbiesInfoResData = payload;
    },
    [editHobbiesInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteHobbiesInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.HobbiesInfo = '';
      state.HobbiesInfoResData = {};
      state.error = '';
    },
  },
});
export default hobbiesInfoSlice.reducer;
