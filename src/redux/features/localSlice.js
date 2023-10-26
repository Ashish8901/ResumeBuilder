import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import resumeService from "../services/resumeService";

export const getAllResumes = createAsyncThunk(
  "resume/getAllResumes",
  async (token) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/resume-listing`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      return err;
    }
  }
);

export const saveLocalData = createAsyncThunk(
  "resume/localData",
  async (data) => {
    try {
      const token = localStorage.getItem("resume_token");
      const loginToken = localStorage.getItem("login_register_token");
      const ResumeName = localStorage.getItem("Resume_Name");

      const response = await resumeService.saveResLocal({
        resume_token: token,
        resume_json_data: data,
        resume_strength: data.resume_strength,
        login_token: loginToken,
        resume_name: ResumeName,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const getLocalData = createAsyncThunk(
  "resume/localData",
  async (token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/get-resume-object`,
        {
          resume_token: token,
        }
      );
      const resume_data = response.data.resume_json_data;
      for (let key in resume_data) {
        if (
          key === "AccomplishArr" ||
          key === "AffilArr" ||
          key === "CertiArr" ||
          key === "Languagefield" ||
          key === "Nativefield" ||
          key === "extra_section_array" ||
          key === "pageSize" ||
          key === "resume_meta_value_custom_sec_One" ||
          key === "resume_meta_value_custom_sec_One" ||
          key === "resume_meta_value_custom_sec_Two" ||
          key === "resume_meta_value_education" ||
          key === "resume_meta_value_heading" ||
          key === "resume_meta_value_webLinks" ||
          key === "resume_meta_value_workexpr" ||
          key === "skillsArr" ||
          key === "summaryArray" ||
          key === "ext_name_arr"
        ) {
          localStorage.setItem(key, JSON.stringify(resume_data[key]));
        } else {
          localStorage.setItem(key, resume_data[key]);
        }
      }
      // return response.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  localData: JSON.parse(localStorage.getItem("ResumeData")) || {},
  resumes: [],
  pdfState: false,
  loading: false,
  error: "",
};

const localSlice = createSlice({
  name: "LocalSlice",
  initialState,
  reducers: {
    pdfStateData: (state, { payload }) => {
      state.pdfState = payload;
    },
  },
  extraReducers: {
    [saveLocalData.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [saveLocalData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.localData = payload.data;
    },
    [saveLocalData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getLocalData.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [getLocalData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.localData = payload?.resume_json_data;
    },
    [getLocalData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getAllResumes.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [getAllResumes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.resumes = payload;
    },
    [getAllResumes.failed]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { pdfStateData } = localSlice.actions;
export default localSlice.reducer;
