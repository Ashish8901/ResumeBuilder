import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import resumeService from "../services/resumeService";

export const deleteAffiliation = createAsyncThunk(
  "extraSection/deleteAffiliation",
  async (id) => {
    try {
      const resumeToken = localStorage.getItem("resume_token");
      const templateId = localStorage.getItem("templateId");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/delete-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_key: "extra_section",
        }
      );
      localStorage.removeItem("resume_meta_value_affiliation");
      localStorage.removeItem("AffilArr");
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editAffiliation = createAsyncThunk(
  "extraSection/editAffiliation",
  async ({ data, id }) => {
    try {
      const resumeToken = localStorage.getItem("resume_token");
      const templateId = localStorage.getItem("templateId");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/edit-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: templateId,
          meta_sub_key: "Affiliation",
          meta_key: "extra_section",
          meta_value: data,
        }
      );
      localStorage.setItem(
        "resume_meta_value_affiliation",
        response.data.meta_value
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addAffiliation = createAsyncThunk(
  "extraSection/addAffiliation",
  async (data) => {
    try {
      const resumeToken = localStorage.getItem("resume_token");
      const templateId = localStorage.getItem("templateId");

      const response = await resumeService.saveAffiliation({
        resume_token: resumeToken,
        resume_template_id: templateId,
        meta_sub_key: "Affiliation",
        meta_key: "extra_section",
        meta_value: data,
      });

      localStorage.setItem(
        "resume_meta_value_affiliation",
        response.data.meta_value.data
      );
      localStorage.setItem("affiliationId", response.data.id);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  loading: false,
  error: "",
  affiliation: localStorage.getItem("resume_meta_value_affiliation") || "",
  affiliationData: {},
};

const affiliationSlice = createSlice({
  name: "affiliations",
  initialState,
  reducers: {},
  extraReducers: {
    [addAffiliation.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [addAffiliation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.affiliation = payload.meta_value.data;
      state.affiliationData = payload;
      state.error = "";
    },
    [addAffiliation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [editAffiliation.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [editAffiliation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.affiliation = payload.meta_value;
      state.affiliationData = payload;
      state.error = "";
    },
    [editAffiliation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteAffiliation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.affiliation = "";
      state.affiliationData = {};
      state.error = "";
    },
  },
});
export default affiliationSlice.reducer;
