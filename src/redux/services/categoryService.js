import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const getCategory = createAsyncThunk(
//   'category/getCategory',
//   async () => {
//     try {
//       //const response = await fetch(`url`); //where you want to fetch data
//       //Your Axios code part.
//       const response = await axios.get('/api/v1/resume/category');
//       console.log(response.data);
//       return [...response.data];
//     } catch (error) {
//       return error.message;
//     }
//   }
// );
