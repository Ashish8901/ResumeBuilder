import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import resumeService from '../services/resumeService';

export const deleteCustomSectionOne = createAsyncThunk(
  'extraSection/deleteCustomSectionOne',
  async (id) => {
    try {
      const resume_token = localStorage.getItem('resume_token');
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/delete-custom-section/${id}`,
        { resume_token, meta_key: 'custom_section' }
      );

      localStorage.removeItem('resume_meta_value_custom_sec_One');

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteCustomSectionTwo = createAsyncThunk(
  'extraSection/deleteCustomSectionTwo',
  async (id) => {
    try {
      const resume_token = localStorage.getItem('resume_token');
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/delete-custom-section/${id}`,
        { resume_token, meta_key: 'custom_section' }
      );

      localStorage.removeItem('resume_meta_value_custom_sec_Two');

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const editCustomSectionOne = createAsyncThunk(
  'extraSection/editCustomSectionOne',
  async ({ id, data }) => {
    const { title, description } = data;
    const resume_token = localStorage.getItem('resume_token');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-custom-section/${id}`,
        {
          meta_value: { title, description },
          meta_key: 'custom_section',
          resume_token,
        }
      );

      localStorage.setItem(
        'resume_meta_value_custom_sec_One',
        JSON.stringify(res.data.meta_value)
      );

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const editCustomSectionTwo = createAsyncThunk(
  'extraSection/editCustomSectionTwo',
  async ({ id, data }) => {
    const { title, description } = data;
    const resume_token = localStorage.getItem('resume_token');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-custom-section/${id}`,
        {
          meta_value: { title, description },
          meta_key: 'custom_section',
          resume_token,
        }
      );

      localStorage.setItem(
        'resume_meta_value_custom_sec_Two',
        JSON.stringify(res.data.meta_value)
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getSingleCustomSectionOne = createAsyncThunk(
  'extraSection/getSingleCustomSectionOne',
  async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/custom-section/${id}`,
        {
          meta_key: 'custom-section',
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getSingleCustomSectionTwo = createAsyncThunk(
  'extraSection/getSingleCustomSectionTwo',
  async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/custom-section/${id}`,
        {
          meta_key: 'custom-section',
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getAllCustomSection = createAsyncThunk(
  'extraSection/getCustomSections',
  async (resume_token) => {
    try {
      const response = await resumeService.getCustomSection({
        resume_token,
        meta_key: 'custom_section',
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addCustomSectionOne = createAsyncThunk(
  'extraSection/addCustomSectionOne',
  async ({ data }) => {
    const resumeToken = localStorage.getItem('resume_token');

    try {
      const response = await resumeService.saveCustomSection({
        resume_token: resumeToken,
        meta_key: 'custom_section',
        meta_value: data,
      });
      localStorage.setItem(
        'resume_meta_value_custom_sec_One',
        JSON.stringify(response.data.meta_value)
      );
      localStorage.setItem('customSecOneId', response.data.id);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const addCustomSectionTwo = createAsyncThunk(
  'extraSection/addCustomSectionTwo',
  async ({ data }) => {
    const resumeToken = localStorage.getItem('resume_token');

    try {
      const response = await resumeService.saveCustomSection({
        resume_token: resumeToken,
        meta_key: 'custom_section',
        meta_value: data,
      });
      localStorage.setItem(
        'resume_meta_value_custom_sec_Two',
        JSON.stringify(response.data.meta_value)
      );
      localStorage.setItem('customSecTwoId', response.data.id);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  custSectionOne:
    JSON.parse(localStorage.getItem('resume_meta_value_custom_sec_One')) || {},
  dataOne: {},
  dataTwo: {},
  custSectionTwo:
    JSON.parse(localStorage.getItem('resume_meta_value_custom_sec_Two')) || {},
  loading: false,
  error: '',
};

const customSectionSlice = createSlice({
  name: 'userCustomSectionSlice',
  initialState,

  extraReducers: {
    [addCustomSectionOne.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addCustomSectionOne.fulfilled]: (state, { payload }) => {
      state.custSectionOne = payload.meta_value;
      state.loading = false;
    },
    [addCustomSectionOne.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addCustomSectionTwo.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addCustomSectionTwo.fulfilled]: (state, { payload }) => {
      state.custSectionTwo = payload.meta_value;
      state.loading = false;
    },
    [addCustomSectionTwo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // [getAllCustomSection.pending]: (state, { payload }) => {
    //   state.loading = true;
    //   state.error = '';
    // },
    // [getAllCustomSection.fulfilled]: (state, { payload }) => {
    //   state.sectionData = payload.custom_section;
    //   state.loading = false;
    // },
    // [getAllCustomSection.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    [getSingleCustomSectionOne.fulfilled]: (state, { payload }) => {
      state.dataOne = payload.meta_value;
      state.loading = false;
    },
    [getSingleCustomSectionTwo.fulfilled]: (state, { payload }) => {
      state.dataTwo = payload.meta_value;
      state.loading = false;
    },

    [editCustomSectionOne.fulfilled]: (state, { payload }) => {
      state.custSectionOne = payload.meta_value;
      state.loading = false;
    },
    [editCustomSectionTwo.fulfilled]: (state, { payload }) => {
      state.custSectionTwo = payload.meta_value;
      state.loading = false;
    },
    [deleteCustomSectionOne.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.custSectionOne = {};
    },
    [deleteCustomSectionTwo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.custSectionTwo = {};
    },
  },
});
export default customSectionSlice.reducer;
