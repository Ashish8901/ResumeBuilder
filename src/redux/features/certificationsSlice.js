import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import resumeService from '../services/resumeService';

export const deleteCertification = createAsyncThunk(
  'extraSection/deleteCertification',
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
      localStorage.removeItem('resume_meta_value_certification');
      localStorage.removeItem('CertiArr');

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editCertification = createAsyncThunk(
  'extraSection/editCertification',
  async ({ data, id }) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_sub_key: 'Certification',
          meta_key: 'extra_section',
          meta_value: data,
        }
      );
      localStorage.setItem(
        'resume_meta_value_certification',
        response.data.meta_value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addCertification = createAsyncThunk(
  'extraSection/addCertification',
  async (data) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const templateId = localStorage.getItem('templateId');

      const response = await resumeService.saveCertification({
        resume_token: resumeToken,
        resume_template_id: templateId,
        meta_sub_key: 'Certification',
        meta_key: 'extra_section',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_certification',
        response.data.meta_value.data
      );
      localStorage.setItem('certificationId', response.data.id);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  loading: false,
  error: '',
  certification: localStorage.getItem('resume_meta_value_certification') || '',
  certiData: {},
};

const certificationSlice = createSlice({
  name: 'certification',
  initialState,
  reducers: {},
  extraReducers: {
    [addCertification.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addCertification.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.certification = payload.meta_value.data;
      state.certiData = payload;
    },
    [addCertification.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [editCertification.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [editCertification.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.certification = payload.meta_value;
      state.certiData = payload;
    },
    [editCertification.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteCertification.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.certification = '';
      state.certiData = {};
    },
  },
});
export default certificationSlice.reducer;
