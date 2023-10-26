import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import resumeService from '../services/resumeService';

export const getEduDescription = createAsyncThunk(
  'education/getEduDescription',
  async () => {
    try {
      const response = await resumeService.getListings({
        category_id: 6,
        sub_category_id: 15,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getSkillsListings = createAsyncThunk(
  'skills/getSkillsListings',
  async (id) => {
    try {
      const res = await resumeService.getListings({
        category_id: 4,
        sub_category_id: id,
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getSummaryListings = createAsyncThunk(
  'summary/getSummaryListings',
  async (id) => {
    try {
      const res = await resumeService.getListings({
        category_id: 5,
        sub_category_id: id,
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAccomplismentListings = createAsyncThunk(
  'summary/getAccomplismentListings',
  async (id) => {
    try {
      const res = await resumeService.getListings({
        category_id: 7,
        sub_category_id: id,
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCertificationListings = createAsyncThunk(
  'summary/getCertificationListings',
  async (id) => {
    try {
      const res = await resumeService.getListings({
        category_id: 9,
        sub_category_id: id,
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAffiliationListings = createAsyncThunk(
  'summary/getAffiliationListings',
  async (id) => {
    try {
      const res = await resumeService.getListings({
        category_id: 8,
        sub_category_id: id,
      });

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const resumeListingSlice = createSlice({
  name: 'Listings',
  initialState: {
    listings: { data: [], loading: 'false', error: '' },
    skillsListings: { loading: 'false', error: '', data: [] },
    summaryListings: { loading: 'false', error: '', data: [] },
    accomplismentListings: { loading: 'false', error: '', data: [] },
    affiliationListings: { loading: 'false', error: '', data: [] },
    certificationListings: { loading: 'false', error: '', data: [] },
  },
  reducers: {},
  extraReducers: {
    [getEduDescription.pending]: (state, { payload }) => {
      state.listings.loading = true;
    },
    [getEduDescription.fulfilled]: (state, { payload }) => {
      state.listings.data = payload.listings;
      state.loading = false;
    },
    [getEduDescription.rejected]: (state, { payload }) => {
      state.listings.loading = false;
      state.listings.error = payload.error.message;
    },
    [getSkillsListings.pending]: (state, { payload }) => {
      state.skillsListings.loading = true;
    },
    [getSkillsListings.fulfilled]: (state, { payload }) => {
      state.skillsListings.data = payload.listings;
      state.skillsListings.loading = false;
    },
    [getSkillsListings.rejected]: (state, { payload }) => {
      state.skillsListings.loading = false;
      state.skillsListings.error = payload.error.message;
    },
    [getSummaryListings.pending]: (state, { payload }) => {
      state.summaryListings.loading = true;
    },
    [getSummaryListings.fulfilled]: (state, { payload }) => {
      state.summaryListings.data = payload.listings;
      state.summaryListings.loading = false;
    },
    [getSummaryListings.rejected]: (state, { payload }) => {
      state.summaryListings.loading = false;
      state.summaryListings.error = payload.error.message;
    },
    [getAccomplismentListings.pending]: (state, { payload }) => {
      state.accomplismentListings.loading = true;
    },
    [getAccomplismentListings.fulfilled]: (state, { payload }) => {
      state.accomplismentListings.data = payload.listings;
      state.accomplismentListings.loading = false;
    },
    [getAccomplismentListings.rejected]: (state, { payload }) => {
      state.accomplismentListings.loading = false;
      state.accomplismentListings.error = payload.error.message;
    },
    [getAffiliationListings.pending]: (state, { payload }) => {
      state.affiliationListings.loading = true;
    },
    [getAffiliationListings.fulfilled]: (state, { payload }) => {
      state.affiliationListings.data = payload.listings;
      state.affiliationListings.loading = false;
    },
    [getAffiliationListings.rejected]: (state, { payload }) => {
      state.affiliationListings.loading = false;
      state.affiliationListings.error = payload.error.message;
    },
    [getCertificationListings.pending]: (state, { payload }) => {
      state.certificationListings.loading = true;
    },
    [getCertificationListings.fulfilled]: (state, { payload }) => {
      state.certificationListings.data = payload.listings;
      state.certificationListings.loading = false;
    },
    [getCertificationListings.rejected]: (state, { payload }) => {
      state.certificationListings.loading = false;
      state.certificationListings.error = payload.error.message;
    },
  },
});

export default resumeListingSlice.reducer;
