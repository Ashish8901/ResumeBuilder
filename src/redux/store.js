import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/categorySlice';
import degreeReducer from './features/degreeSlice';
import colorReducer from './features/colorSlice';
import createResumeReducer from './features/resumeSlice';
import ListingsReducer from './features/descriptionListingSlice';
import workExperienceReducer from './features/workExperienceSlice';
import subCategoryReducer from './features/subCategorySlice';
import skillsReducer from './features/skillsSlice';
import summaryReducer from './features/summarySlice';
import customSectionReducer from './features/customSectionSlice';
import accomplishmentsReducer from './features/accomplishmentsSlice';
import affiliationReducer from './features/affiliationsSlice';
import additionalInfoReducer from './features/additionalInfoSlice';
import certificationReducer from './features/certificationsSlice';
import LanguageReducer from './features/LanguageSlice';
import webLinksReducer from './features/webLinksSlice';
import extraSecArrReducer from './features/extraSectionSlice';
import activeHeaderReducer from './features/activeHeaderSlice';
import popularSubCategoryReducer from './features/popularJobTitleSlice';
import fontsizeReducer from './features/fontSizeSlice';
import previewFontReducer from './features/previewFontSlice';
import subscriptionReducer from './features/subscriptionSlice';
import localDataReducer from './features/localSlice';
import previewSection from './features/previewSectionSlice';
import hobbiesInfoReducer from './features/hobbiesSlice';
import signatureReducer from './features/signatureSlice';
export default configureStore({
  reducer: {
    category: categoryReducer,
    Degrees: degreeReducer,
    templateColor: colorReducer,
    resumeData: createResumeReducer,
    ListingsData: ListingsReducer,
    workExprData: workExperienceReducer,
    subCategoryData: subCategoryReducer,
    skillsData: skillsReducer,
    summaryData: summaryReducer,
    customSectionData: customSectionReducer,
    accomplishmentsData: accomplishmentsReducer,
    affiliationsData: affiliationReducer,
    additionalInfoData: additionalInfoReducer,
    hobbiesinfoData: hobbiesInfoReducer,
    certificationData: certificationReducer,
    webLinksData: webLinksReducer,
    extraSecArrData: extraSecArrReducer,
    LanguageData: LanguageReducer,
    activeHeaderData: activeHeaderReducer,
    popularSubCatData: popularSubCategoryReducer,
    fontsize: fontsizeReducer,
    previewfontsize: previewFontReducer,
    previewSectionSlice: previewSection,
    subscriptionData: subscriptionReducer,
    localResData: localDataReducer,
    signatureData: signatureReducer,
  },
});
