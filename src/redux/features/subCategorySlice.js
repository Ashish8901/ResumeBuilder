import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSkillsSubCategories = createAsyncThunk(
  'skillsSubCategory/getSkillsSubCategories',
  async (searchText) => {
    try {
      let link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?category_id=4`;
      if (searchText) {
        link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?search=${searchText}&category_id=4`;
      }

      const res = await axios.get(link);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getSummmarySubCategories = createAsyncThunk(
  'summarySubCategory/getSummmarySubCategories',
  async (searchText) => {
    try {
      let link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?category_id=5`;
      if (searchText) {
        link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?search=${searchText}&category_id=5`;
      }

      const res = await axios.get(link);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getAccompSubCategories = createAsyncThunk(
  'accompSubCategory/getAccompSubCategories',
  async (searchText) => {
    try {
      let link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?category_id=7`;
      if (searchText) {
        link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?search=${searchText}&category_id=7`;
      }

      const res = await axios.get(link);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getAffiliSubCategories = createAsyncThunk(
  'accompSubCategory/getAffiliSubCategories',
  async (searchText) => {
    try {
      let link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?category_id=8`;
      if (searchText) {
        link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?search=${searchText}&category_id=8`;
      }

      const res = await axios.get(link);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getCertifiSubCategories = createAsyncThunk(
  'accompSubCategory/getCertifiSubCategories',
  async (searchText) => {
    try {
      let link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?category_id=9`;
      if (searchText) {
        link = `${process.env.REACT_APP_BASE_URL}/resume/search-subcategory?search=${searchText}&category_id=9`;
      }

      const res = await axios.get(link);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const getSubCategoriesSlice = createSlice({
  name: 'Sub Categories',
  initialState: {
    SkillsSubCategories: { data: [], loading: false, error: '' },
    SummarySubCategories: { data: [], loading: false, error: '' },
    AccompSubCategories: { data: [], loading: false, error: '' },
    CertiSubCategories: { data: [], loading: false, error: '' },
    AffiliSubCategories: { data: [], loading: false, error: '' },
  },
  reducers: {},
  extraReducers: {
    [getSkillsSubCategories.pending]: (state, { payload }) => {
      state.SkillsSubCategories.loading = true;
    },
    [getSkillsSubCategories.fulfilled]: (state, { payload }) => {
      state.SkillsSubCategories.data = payload.subCategory;
      state.SkillsSubCategories.loading = false;
    },
    [getSkillsSubCategories.rejected]: (state, { payload }) => {
      state.SkillsSubCategories.loading = false;
      state.SkillsSubCategories.error = payload.error.message;
    },
    [getSummmarySubCategories.pending]: (state, { payload }) => {
      state.SummarySubCategories.loading = true;
    },
    [getSummmarySubCategories.fulfilled]: (state, { payload }) => {
      state.SummarySubCategories.data = payload.subCategory;
      state.SummarySubCategories.loading = false;
    },
    [getSummmarySubCategories.rejected]: (state, { payload }) => {
      state.SummarySubCategories.loading = false;
      state.SummarySubCategories.error = payload.error.message;
    },
    [getAccompSubCategories.pending]: (state, { payload }) => {
      state.AccompSubCategories.loading = true;
    },
    [getAccompSubCategories.fulfilled]: (state, { payload }) => {
      state.AccompSubCategories.data = payload.subCategory;
      state.AccompSubCategories.loading = false;
    },
    [getAccompSubCategories.rejected]: (state, { payload }) => {
      state.AccompSubCategories.loading = false;
      state.AccompSubCategories.error = payload.error.message;
    },
    [getCertifiSubCategories.pending]: (state, { payload }) => {
      state.CertiSubCategories.loading = true;
    },
    [getCertifiSubCategories.fulfilled]: (state, { payload }) => {
      state.CertiSubCategories.data = payload.subCategory;
      state.CertiSubCategories.loading = false;
    },
    [getCertifiSubCategories.rejected]: (state, { payload }) => {
      state.CertiSubCategories.loading = false;
      state.CertiSubCategories.error = payload.error.message;
    },
    [getAffiliSubCategories.pending]: (state, { payload }) => {
      state.AffiliSubCategories.loading = true;
    },
    [getAffiliSubCategories.fulfilled]: (state, { payload }) => {
      state.AffiliSubCategories.data = payload.subCategory;
      state.AffiliSubCategories.loading = false;
    },
    [getAffiliSubCategories.rejected]: (state, { payload }) => {
      state.AffiliSubCategories.loading = false;
      state.AffiliSubCategories.error = payload.error.message;
    },
  },
});

export default getSubCategoriesSlice.reducer;
