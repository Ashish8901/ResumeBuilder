import http from '../http-common/http-common';

const getAll = () => {
  return http.get('/resume/degree');
};
const saveTemplates = (data) => {
  return http.post('/resume/resume-style', data);
};
const gettemplates = (data) => {
  return http.post('/resume/get-resume-style', data);
};
const getListings = (data) => {
  return http.post('/resume/listings', data);
};

const deleteDegree = (data) => {
  return http.post('/resume/delete-meta', data);
};
const deleteJob = (data) => {
  return http.post('/resume/delete-meta', data);
};
const editIndexData = (data) => {
  return http.post('/resume/update-meta-value', data);
};
const editJobIndexData = (data) => {
  return http.post('/resume/update-meta-value', data);
};

const getAllSubCategory = (data) => {
  return http.post('/resume/sub-category', data);
};

const create = (data) => {
  return http.post('/resume/save-meta', data);
};
const getMetaData = (data) => {
  return http.post('/resume/get-meta', data);
};
const registerUser = (data) => {
  return http.post('/register', data);
};
const loginUser = (data) => {
  return http.post('/login', data);
};

const saveCustomSection = (data) => {
  return http.post('/resume/add-custom-section', data);
};
const getCustomSection = (data) => {
  return http.post('/resume/custom-section-listing', data);
};

//For accomplishment
const saveAccomplishment = (data) => {
  return http.post('/resume/add-extra-section', data);
};

const editAccomplishments = (data) => {
  return http.post('/resume/edit-extra-section', data);
};

//For affiliations
const saveAffiliation = (data) => {
  return http.post('/resume/add-extra-section', data);
};

//For additional-information
const saveAdditionalInfo = (data) => {
  return http.post('/resume/add-extra-section', data);
};

//for hobby
const saveHobbiesInfo = (data) => {
  return http.post('/resume/add-extra-section', data);
};

//For certification
const saveCertification = (data) => {
  return http.post('/resume/add-extra-section', data);
};
//For Languages Listing
const getAllLanguages = (data) => {
  return http.get('/resume/all-languages', data);
};

//For Weblinks-Portfolio
const saveWebLinks = (data) => {
  return http.post('/resume/add-extra-section', data);
};

//For adding Language
const saveLanguage = (data) => {
  return http.post('/resume/save-lang', data);
};
// for delete extra Section
const deleteSectionData = (data) => {
  return http.post('/resume/delete-resume-section', data);
};
// for save style
const saveStyle = (data) => {
  return http.post('/resume/resume-style', data);
};
//for delete-meta-section
const deleteSection = (data) => {
  return http.post('/resume/delete-meta-section', data);
};
// for popular job Titles
const getpopularjobTitlesData = (data) => {
  return http.post('/resume/popular-sub-category', data);
};

//Save resume's local data
const saveResLocal = (data) => {
  return http.post('/resume/save-resume-object', data);
};

// //Get resume's local data
// const getResumeLocal = (data)=>{
//   return http.post('/resume/get-resume-object',data);
// }

const ResumePageService = {
  saveResLocal,
  // getResumeLocal,
  gettemplates,
  getAll,
  create,
  getMetaData,
  getListings,
  getAllSubCategory,
  registerUser,
  deleteDegree,
  editIndexData,
  editJobIndexData,
  deleteJob,
  loginUser,
  saveCustomSection,
  getCustomSection,
  saveAccomplishment,
  saveAffiliation,
  saveAdditionalInfo,
  editAccomplishments,
  saveWebLinks,
  saveHobbiesInfo,
  saveCertification,
  getAllLanguages,
  saveLanguage,
  deleteSectionData,
  saveStyle,
  deleteSection,
  getpopularjobTitlesData,
  saveTemplates,
  // getAllResumeTemplates,
};
export default ResumePageService;
