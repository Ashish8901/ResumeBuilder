import { createSlice } from "@reduxjs/toolkit";
import resumeService from "../services/resumeService";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    try {
      const response = await resumeService.getCategory();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: "false",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.category = [];
      state.loading = "true";
    });
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.category = payload.categories;
      state.loading = "false";
      localStorage.setItem("title", JSON.stringify(state.category));
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = "false";
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
