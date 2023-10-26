import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const subscriptionData = createAsyncThunk(
  "user/suscriptionPlan",
  async (usertoken) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subscription-plan`,
        {
          headers: {
            Authorization: `${usertoken}`,
          },
        }
      );
      localStorage.setItem(
        "sub_status",
        res.data.data.current_plan.subscription_billing.status
      );
      return res.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getBillHistory = createAsyncThunk(
  "user/bill-history",
  async (sub_id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/bill-info/${sub_id}`
        //     {
        //         headers: {
        //           Authorization: `${usertoken}`,
        //         },
        // }
      );
      return res.data.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  subscriptionPlan: [],
  planDetails: {},
  currentPlan: {},
  billHistory: [],
  loading: false,
  error: "",
};

const subscriptionDataSlice = createSlice({
  name: "SubscriptionSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [subscriptionData.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [subscriptionData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.subscriptionPlan = payload.subscription_plan;
      state.planDetails = payload.plan_details;
      state.currentPlan = payload.current_plan;
    },
    [subscriptionData.pending]: (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error?.message;
    },
    [getBillHistory.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getBillHistory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.billHistory = payload.bill_history;
    },
    [getBillHistory.pending]: (state, { payload }) => {
      state.loading = false;
      state.error = payload?.error?.message;
    },
  },
});
export default subscriptionDataSlice.reducer;
