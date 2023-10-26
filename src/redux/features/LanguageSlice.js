import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import resumeService from '../services/resumeService';

export const addlanguage = createAsyncThunk(
  'extrasections/addlanguage',
  async (data) => {
    const resumeToken = localStorage.getItem('resume_token');
    const templateId = localStorage.getItem('templateId');

    try {
      const response = await resumeService.saveLanguage({
        resume_token: resumeToken,
        resume_template_id: templateId,
        meta_sub_key: 'Language',
        meta_key: 'extra_section',
        meta_value: data,
      });

      localStorage.setItem('languageId', response.data.id);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getLanguage = createAsyncThunk(
  'Language/getlanguage',
  async () => {
    try {
      const response = await resumeService.getAllLanguages();

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getSearchlanguage = createAsyncThunk(
  'language/getSearchlanguage',
  async (searchText) => {
    try {
      let link = `${process.env.REACT_APP_BASE_URL}/resume/search-language?search=${searchText}`;

      const res = await axios.get(link);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteLanguage = createAsyncThunk(
  'extraSection/deleteLanguage',
  async (id) => {
    try {
      const resumeToken = localStorage.getItem('resume_token');
      const tempId = localStorage.getItem('templateId');
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/delete-extra-section/${id}`,
        {
          resume_token: resumeToken,
          resume_template_id: tempId,
          meta_key: 'extra_section',
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const LanguageSlice = createSlice({
  name: 'Language',
  initialState: {
    loading: false,
    error: '',
    LanguageArr: [],
    SearchLang: { data: [], loading: false, error: '' },
    Language: {
      nativeLang: JSON.parse(localStorage.getItem('Nativefield')) || [],
      proLanguage: JSON.parse(localStorage.getItem('Languagefield')) || [],
    },
  },
  extraReducers: {
    [addlanguage.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = '';
    },
    [addlanguage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.Language.nativeLang = payload.meta_value.data.Native;
      state.Language.proLanguage = payload.meta_value.data.Languages;
      state.error = '';
    },
    [addlanguage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getLanguage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.LanguageArr = payload;
    },
    [deleteLanguage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.Language.nativeLang = [];
      state.Language.proLanguage = [];
    },
    [getSearchlanguage.pending]: (state, { payload }) => {
      state.SearchLang.loading = true;
    },
    [getSearchlanguage.fulfilled]: (state, { payload }) => {
      state.SearchLang.data = payload.languages;
      state.SearchLang.loading = false;
    },
    [getSearchlanguage.rejected]: (state, { payload }) => {
      state.SearchLang.loading = false;
      state.SearchLang.error = payload.error.message;
    },
  },
});

export default LanguageSlice.reducer;
