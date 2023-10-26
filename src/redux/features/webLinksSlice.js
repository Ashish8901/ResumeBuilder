import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import resumeService from '../services/resumeService';

export const deleteWebLinks = createAsyncThunk(
  'extraSection/deleteWebLinks',
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
      localStorage.removeItem('resume_meta_value_webLinks');
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editWeblinks = createAsyncThunk(
  'extraSection/editWeblinks',
  async ({ data, id }) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_sub_key: 'WebLinks',
          meta_key: 'extra_section',
          meta_value: data,
        }
      );
      localStorage.setItem(
        'resume_meta_value_webLinks',
        JSON.stringify(response.data.meta_value)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addWeblinks = createAsyncThunk(
  'extraSection/addWebLinks',
  async (data) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await resumeService.saveWebLinks({
        resume_token: resumeToken,
        resume_template_id: templateId,
        meta_sub_key: 'WebLinks',
        meta_key: 'extra_section',
        meta_value: data,
      });
      localStorage.setItem(
        'resume_meta_value_webLinks',
        JSON.stringify(response.data.meta_value.data)
      );
      localStorage.setItem('webLinksId', response.data.id);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  webLinks:
    JSON.parse(localStorage.getItem('resume_meta_value_webLinks')) || {},
  weblinksResData: {},
  loading: false,
  error: '',
};

const webLinksSlice = createSlice({
  name: 'Web-Links',
  initialState,
  reducers: {},
  extraReducers: {
    [addWeblinks.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addWeblinks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.webLinks = payload.meta_value.data;
      state.weblinksResData = payload;
      state.error = '';
    },
    [addWeblinks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [editWeblinks.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [editWeblinks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.webLinks = payload.meta_value;
      state.weblinksResData = payload;
      state.error = '';
    },
    [editWeblinks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteWebLinks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.webLinks = null;
      state.weblinksResData = {};
      state.error = '';
    },
  },
});
export default webLinksSlice.reducer;
