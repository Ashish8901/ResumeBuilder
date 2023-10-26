import axios from 'axios';
// const token = JSON.parse(localStorage.getItem("register_user_token"))
// console.log(token)
export default axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    // Authorization: `${token}`,
  },
});
