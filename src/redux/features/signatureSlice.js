import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import resumeService from '../services/resumeService';

export const getSignature = createAsyncThunk(
  "signature/getSignature",
  async () => {
    try {
      const token = localStorage.getItem("resume_token");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/get-meta`,
        {
          meta_key: "signature",
          resume_token: token,
        }
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const addSignature = createAsyncThunk(
  "signature/addSignature",
  async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/create-signature`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem(
        "resume_meta_value_signature",
        JSON.stringify(response.data.resume.meta_value)
      );
      return response.data.resume.meta_value;
    } catch (error) {
      return error;
    }
  }
);
export const updateSignature = createAsyncThunk(
  "signature/updateSignature",
  async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/update-signature`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem(
        "resume_meta_value_signature",
        JSON.stringify(response.data.resume.meta_value)
      );
      return response.data.resume.meta_value;
    } catch (error) {
      return error;
    }
  }
);

export const deleteSignature = createAsyncThunk(
  "signature/deleteSignature",
  async () => {
    const token = localStorage.getItem("resume_token");
    try {
      const response = await resumeService.deleteSection({
        resume_token: token,
        meta_key: "signature",
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
const initialState = {
  SignResponse:
    JSON.parse(localStorage.getItem("resume_meta_value_signature")) || {},
  text: "",
  ischeck: null,
  alignment: "",
  location: "",
  loading: false,
  color: "black",
  textsize: "20",
  signSize: "140",
  imageSize: "100",
  date: "",
  signdata: "",
  imagedata: "",
  contrast: null,
  style: {
    fontStyle: "normal",
    fontFamily: "Italianno",
    color: "black",
  },
  error: "",
};
const signatureSlice = createSlice({
  name: "signature",
  initialState,
  reducers: {
    alignmentReducer: (state, { payload }) => {
      state.alignment = payload;
    },
    checkboxReducer: (state, { payload }) => {
      state.ischeck = payload;
    },
    locationReducer: (state, { payload }) => {
      state.location = payload;
    },
    colorReducer: (state, { payload }) => {
      state.color = payload;
    },
    textsizeReducer: (state, { payload }) => {
      state.textsize = payload;
    },
    imagesizeReducer: (state, { payload }) => {
      state.imageSize = payload;
    },
    padSignsizeReducer: (state, { payload }) => {
      state.signSize = payload;
    },
    imageSignReducer: (state, { payload }) => {
      state.imagedata = payload;
    },
    styleReducer: (state, { payload }) => {
      state.style = payload;
    },
    contrastReducer: (state, { payload }) => {
      state.contrast = payload;
    },
    dateReducer: (state, { payload }) => {
      state.date = payload;
    },
    textReducer: (state, { payload }) => {
      state.text = payload;
    },
    padSignReducer: (state, { payload }) => {
      state.signdata = payload;
    },
  },
  extraReducers: {
    [getSignature.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [getSignature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.response.data.message;
      state.SignResponse = payload;
    },
    [getSignature.rejected]: (state, { payload }) => {
      console.log("rejected", payload);

      state.loading = false;
      state.error = payload;
    },
    [addSignature.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [addSignature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.SignResponse = payload;
    },
    [addSignature.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateSignature.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [updateSignature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.SignResponse = payload;
    },
    [updateSignature.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteSignature.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.SignResponse = {};
    },
  },
});
export const {
  checkboxReducer,
  locationReducer,
  alignmentReducer,
  colorReducer,
  textsizeReducer,
  styleReducer,
  dateReducer,
  textReducer,
  padSignReducer,
  padSignsizeReducer,
  imageSignReducer,
  contrastReducer,
  imagesizeReducer,
} = signatureSlice.actions;

export default signatureSlice.reducer;
