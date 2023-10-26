import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import resumeService from '../services/resumeService';

export const getDegree = createAsyncThunk('degree/getDegree', async () => {
  try {
    const response = await resumeService.getAll();

    return response.data;
  } catch (error) {
    return error;
  }
});

export const getEducation = createAsyncThunk(
  'education/getEducation',
  async () => {
    try {
      const token = localStorage.getItem('resume_token');
      const response = await resumeService.getMetaData({
        meta_key: 'education',
        resume_token: token,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteDegreeIndex = createAsyncThunk(
  'delete/deleteDegree',
  async (index) => {
    try {
      const token = localStorage.getItem('resume_token');

      const response = await resumeService.deleteDegree({
        resume_token: token,
        meta_key: 'education',
        meta_index: index,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteEducation = createAsyncThunk(
  'education/deleteEducation',
  async () => {
    const token = localStorage.getItem('resume_token');
    try {
      const response = await resumeService.deleteSection({
        resume_token: token,
        meta_key: 'education',
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getHeading = createAsyncThunk('heading/getHeading', async () => {
  try {
    const token = localStorage.getItem('resume_token');
    const response = await resumeService.getMetaData({
      meta_key: 'heading',
      resume_token: token,
    });

    return response.data;
  } catch (error) {
    return error;
  }
});

export const addEducation = createAsyncThunk(
  'education/addEducation',
  async ({ data, resume_token, resume_id = 41 }) => {
    try {
      const details = JSON.parse(
        localStorage.getItem('resume_meta_value_education')
      );
      const templateId = localStorage.getItem('templateId');

      const response = await resumeService.create({
        resume_token,
        resume_template_id: templateId,
        meta_key: 'education',
        meta_value: details === null ? [data] : [...details?.meta_value, data],
      });

      localStorage.setItem(
        'resume_meta_value_education',
        JSON.stringify(response.data.resume)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addHeading = createAsyncThunk(
  'heading/addHeading',
  async (defaultHeadingValues) => {
    const {
      fname,
      lname,
      phone,
      pincode,
      street,
      location,
      birthDatePlace,
      email,
      licence,
      maritalStatus,
      socialLink,
    } = defaultHeadingValues;
    const token = localStorage.getItem('resume_token');
    const templateId = localStorage.getItem('templateId');

    try {
      const response = await resumeService.create({
        resume_token: token,
        resume_template_id: templateId,
        meta_key: 'heading',
        meta_value: {
          fname,
          lname,
          street,
          location,
          birthDatePlace,
          pincode,
          phone,
          email,
          licence,
          maritalStatus,
          socialLink,
        },
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteHeading = createAsyncThunk(
  'education/deleteEducation',
  async () => {
    const token = localStorage.getItem('resume_token');
    try {
      const response = await resumeService.deleteSection({
        resume_token: token,
        meta_key: 'heading',
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const editIndexData = createAsyncThunk(
  'education/editEducation',
  async ({ data, resume_token, degreeObjectIndex }) => {
    const templateId = localStorage.getItem('templateId');

    try {
      const response = await resumeService.editIndexData({
        resume_token,
        resume_template_id: templateId,
        meta_index: degreeObjectIndex,
        meta_key: 'education',
        meta_value: data,
      });

      localStorage.setItem(
        'resume_meta_value_education',
        JSON.stringify(response.data.resume)
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

// export const addUser = createAsyncThunk(
//   'register/addUser',
//   async ({ first_name, last_name, email, password }) => {
//     const token = localStorage.getItem('resume_token');
//     const ResumeName = localStorage.getItem('Resume_Name');

//     const response = await resumeService.registerUser({
//       resume_name: ResumeName,
//       first_name,
//       last_name,
//       email,
//       password,
//       resume_token: token,
//     });
//     localStorage.setItem('login_data', JSON.stringify(response.data.data));
//     localStorage.setItem('login_register_token', response.data.token);
//     console.log(response.data);

//     return response.data;
//   }
// );

export const addUser = createAsyncThunk(
  'register/addUser',
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    const token = localStorage.getItem('resume_token');
    const ResumeName = localStorage.getItem('Resume_Name');
    try {
      const response = await resumeService.registerUser({
        resume_name: ResumeName,
        first_name,
        last_name,
        email,
        password,
        resume_token: token,
      });
      if (response.data.status === 200) {
        localStorage.setItem('login_data', JSON.stringify(response.data.data));
        localStorage.setItem('login_register_token', response.data.token);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const handleGoogleLogin = createAsyncThunk(
  'login/googleUser',
  async (googleData) => {
    const token = localStorage.getItem('resume_token');
    const ResumeName = localStorage.getItem('Resume_Name');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        JSON.stringify({
          social_id: googleData.profileObj.googleId,
          login_token: googleData.tokenId,
          name: googleData.profileObj.name,
          email: googleData.profileObj.email,
          mode: 'google',
          resume_token: token,
          resume_name: ResumeName,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // setLoginData(data);
      localStorage.setItem('login_data', JSON.stringify(response.data.data));
      localStorage.setItem('login_register_token', response.data.token);
      return response.data;
      // navigate('/customer');
    } catch (error) {
      return error;
    }
  }
);

export const handleFacebookLogin = createAsyncThunk(
  'login/facebookUser',
  async (response) => {
    const token = localStorage.getItem('resume_token');
    const ResumeName = localStorage.getItem('Resume_Name');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        JSON.stringify({
          social_id: response.userID,
          login_token: response.accessToken,
          name: response.name,
          email: response.email,
          mode: 'facebook',
          resume_token: token,
          resume_name: ResumeName,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('login_data', JSON.stringify(res.data.data));
      localStorage.setItem('login_register_token', res.data.token);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }) => {
    const token = localStorage.getItem('resume_token');
    const ResumeName = localStorage.getItem('Resume_Name');

    try {
      const response = await resumeService.loginUser({
        email,
        password,
        mode: 'web',
        resume_token: token,
        resume_name: ResumeName,
      });

      localStorage.setItem('login_data', JSON.stringify(response.data.data));
      localStorage.setItem('login_register_token', response.data.token);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const UploadImage = createAsyncThunk(
  'heading/uploadImage',
  async (formData) => {
    try {
      // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/upload-photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      localStorage.setItem('image', response.data?.photo);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getImage = createAsyncThunk(
  'heading/getImage',
  async (resume_token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/get-photo`,
        { resume_token }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const userInfoFromStorage = localStorage.getItem('login_data')
  ? JSON.parse(localStorage.getItem('login_data'))
  : null;

const userTokenFromStorage = localStorage.getItem('login_register_token')
  ? localStorage.getItem('login_register_token')
  : null;

const resumeHeading = localStorage.getItem('resume_meta_value_heading')
  ? JSON.parse(localStorage.getItem('resume_meta_value_heading'))
  : null;

const initialState = {
  resumeToken: null || localStorage.getItem('resume_token'),
  experienceLevel: '' || localStorage.getItem('selected_Exp'),
  studentCheck: '' || localStorage.getItem('isStudent'),
  country: '' || localStorage.getItem('selected_country'),
  template_id: '' || localStorage.getItem('templateId'),
  image: '' || localStorage.getItem('image'),
  heading: {
    loading: false,
    error: '',
    data: resumeHeading,
  },

  userData: {
    loading: false,
    error: '',
    data: {
      userInfo: userInfoFromStorage,
      token: userTokenFromStorage,
    },
  },
  loginData: {
    loading: false,
    error: '',
    data: {
      userInfo: userInfoFromStorage,
      token: userTokenFromStorage,
    },
  },
  AllResumes: {
    loading: false,
    error: '',
    data: {},
  },
  degreeList: [],

  degreeData: {
    loading: false,
    error: '',
    degreesData:
      JSON.parse(localStorage.getItem('resume_meta_value_education'))
        ?.meta_value || [],
  },
};
const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    selectExperience: (state, { payload }) => {
      state.experienceLevel = payload;
      localStorage.setItem('selected_Exp', payload);
    },
    selectCountry: (state, { payload }) => {
      state.country = payload.label;
      localStorage.setItem('selected_country', payload.label);
    },
    checkifstudent: (state, { payload }) => {
      state.studentCheck = payload;
      localStorage.setItem('isStudent', payload);
    },
    getEduDescription: (state, { payload }) => {
      state.studentCheck = payload;
    },
    changeTemplateId: (state, { payload }) => {
      state.template_id = payload;
      localStorage.setItem('templateId', payload);
    },
    // uploadedImage: (state, { payload }) => {
    //   state.image = payload.resume;
    //   localStorage.setItem('image', payload.resume.photo);
    // },
    logout: (state, { payload }) => {
      state.loginData.data = {};
      state.userData.data = {};

      localStorage.removeItem('login_data');
      localStorage.removeItem('login_register_token');
    },
  },
  extraReducers: {
    [getImage.fulfilled]: (state, { payload }) => {
      state.image = payload.base64_img;
      // localStorage.setItem('image', payload.photo);
    },
    [deleteDegreeIndex.fulfilled]: (state, { payload }) => {
      state.degreeData.degreesData = payload.resume.meta_value;
    },
    [editIndexData.fulfilled]: (state, { payload }) => {
      state.degreeData.degreesData = payload.resume.meta_value;
    },
    [addEducation.pending]: (state, { payload }) => {
      state.degreeData.loading = true;
    },
    [addEducation.fulfilled]: (state, { payload }) => {
      let arr = [];
      arr = payload.resume.meta_value.pop();
      state.degreeData.degreesData.push(arr);
      state.degreeData.loading = false;
    },
    [addEducation.rejected]: (state, { payload }) => {
      state.degreeData.loading = false;
      state.degreeData.error = payload.error.message;
    },
    [addHeading.pending]: (state, { payload }) => {
      state.heading.loading = true;
    },
    [addHeading.fulfilled]: (state, { payload }) => {
      state.heading.data = payload.resume.meta_value;
      state.heading.loading = false;
    },
    [addHeading.rejected]: (state, { payload }) => {
      state.heading.loading = false;
      state.heading.error = payload.error.message;
    },
    [deleteHeading.fulfilled]: (state, { payload }) => {
      state.loading = 'false';
      state.heading.data = null;
    },

    [getDegree.fulfilled]: (state, { payload }) => {
      state.degreeList = payload.degree;
    },
    [handleGoogleLogin.pending]: (state, { payload }) => {
      state.loginData.loading = true;
    },
    [handleGoogleLogin.fulfilled]: (state, { payload }) => {
      state.loginData.data.userInfo = payload.data;
      state.loginData.data.token = payload.token;
      state.loginData.loading = false;
    },
    [handleGoogleLogin.rejected]: (state, { payload }) => {
      state.loginData.loading = false;
      state.loginData.error = payload.error.message;
    },
    [handleFacebookLogin.pending]: (state, { payload }) => {
      state.loginData.loading = true;
    },
    [handleFacebookLogin.fulfilled]: (state, { payload }) => {
      state.loginData.data.userInfo = payload.data;
      state.loginData.data.token = payload.token;
      state.loginData.loading = false;
    },
    [handleFacebookLogin.rejected]: (state, { payload }) => {
      state.loginData.loading = false;
      state.loginData.error = payload.error.message;
    },

    [addUser.pending]: (state, { payload }) => {
      state.userData.loading = true;
    },
    [addUser.fulfilled]: (state, { payload }) => {
      state.userData.data = payload.data;
      state.loginData.data.userInfo = payload.data;
      state.loginData.data.token = payload.token;
      state.userData.loading = false;
    },
    [addUser.rejected]: (state, { payload }) => {
      state.userData.loading = false;
      state.userData.error = payload.error.email[0];
    },

    // [addUser.pending]: (state, { payload }) => {
    //   state.userData.loading = true;
    // },
    // [addUser.fulfilled]: (state, { payload }) => {
    //   state.loginData.data.userInfo = payload.data;
    //   state.loginData.data.token = payload.token;
    //   state.userData.loading = false;
    // },
    // [addUser.rejected]: (state, { payload }) => {
    //   state.userData.loading = false;
    //   state.userData.error = payload.error.message;
    // },

    [loginUser.pending]: (state, { payload }) => {
      state.loginData.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loginData.data.userInfo = payload.data;
      state.loginData.data.token = payload.token;
      state.loginData.loading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loginData.loading = false;
      state.loginData.error = payload.error.message;
    },
    [deleteEducation.fulfilled]: (state, { payload }) => {
      state.degreeData.degreesData = [];
      state.degreeData.loading = false;
    },
  },
});
export const {
  selectExperience,
  selectCountry,
  checkifstudent,
  deleteDegreeObject,
  logout,
  changeTemplateId,
} = resumeSlice.actions;

export default resumeSlice.reducer;
