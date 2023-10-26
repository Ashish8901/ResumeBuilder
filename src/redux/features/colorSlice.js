import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ResumePageService from '../services/resumeService';

export const saveCustomStyle = createAsyncThunk(
  'customStyle/saveCustomStyle',
  async ({data,id}) => {
    try {
      const resume_token = localStorage.getItem('resume_token');
      const response = await ResumePageService.saveStyle({
        resume_token,
        template_id:id,
        formatting: data,
      });
      // console.log("data response",response)
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const initialState = {
  backgroundColor: localStorage.getItem("bGColor") || "var(--default-template)",
  fontColor: localStorage.getItem("fColor") || "#fff",
  onMouseEnterBgClor: null,
  onMouseEnterFontColor: null,
  borderColor: localStorage.getItem("bGColor") || "var(--default-template)",
  color: localStorage.getItem("bGColor") || "var(--default-template)",
};

const colorSlice = createSlice({
  name: 'templateColor',
  initialState,
  reducers: {
    changeTemplateColor: (state, { payload }) => {
      state.backgroundColor = payload.backgroundColor;
      localStorage.setItem('bGColor', payload.backgroundColor);
      state.fontColor = payload.fontColor;
      localStorage.setItem('fColor', payload.fontColor);
      state.borderColor = payload.backgroundColor;
      state.onMouseEnterBgClor = payload.onMouseEnterBgClor;
      state.onMouseEnterFontColor = payload.onMouseEnterFontColor;
    },
  },
});
export const { changeTemplateColor } = colorSlice.actions;
export default colorSlice.reducer;
