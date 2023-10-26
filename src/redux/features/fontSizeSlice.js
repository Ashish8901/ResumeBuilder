import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  ResumePageService from '../services/resumeService';


export const getTemplates = createAsyncThunk('/resume/getdata', async (data) => {
  try {
    let resume_token = localStorage.getItem("resume_token");
    const response = await ResumePageService.gettemplates({
      resume_token,
      template_id: data
    })
  
    return response.data;
  }
  catch (err) {
    console.log(err)
  }
})
const initialState = {
  fontSize: localStorage.getItem('customFontSize') || '11',
  headingSize: localStorage.getItem('customHeadingSize') || '18',
  lineSpacing: localStorage.getItem('lineSpacing') || '2',
  sectionSpacing: localStorage.getItem('sectionSpacing') || '1',
  paragraphSpacing: localStorage.getItem('paragraphSpacing') || '2',
  paragraphIndentSize: localStorage.getItem('paragraphIndentSize') || '0',
  fontStyle: localStorage.getItem('fontStyle') || 'Montserrat',
};
const fontslice = createSlice({
  name: 'fontsize',
  initialState,
  reducers: {
    changeFontSize(state, action) {
      state.fontSize = action.payload;
      let title = document.getElementsByClassName('name-title');
      let paragraph = document.getElementsByClassName('paragraph');
      for (let i = 0; i < title.length || i < paragraph.length; i++) {
        if (i < title.length) {
          title[i].style.fontSize = parseInt(state.fontSize) + 30 + 'px';
        }
        if (i < paragraph.length) {
          paragraph[i].style.fontSize = parseInt(state.fontSize) + 5 + 'px';
        }
      }
      localStorage.setItem('customFontSize', state.fontSize);
    },
    changeHeadingSize(state, action) {
      state.headingSize = action.payload;
      let heading = document.getElementsByClassName('resume-heading');
      for (let i = 0; i < heading.length; i++) {
        if (i < heading.length) {
          heading[i].style.fontSize = parseInt(state.headingSize) + 4 + 'px';
        }
      }
      localStorage.setItem('customHeadingSize', state.headingSize);
    },
    changeLineSpacing(state, action) {
      state.lineSpacing = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');

      for (let i = 0; i < paragraph.length; i++) {
        if (i < paragraph.length) {
          paragraph[i].style.lineHeight =
            parseInt(state.lineSpacing) + 22 + 'px';
        }
      }
      localStorage.setItem('lineSpacing', state.lineSpacing);
    },
    changeSectionSpacing(state, action) {
      state.sectionSpacing = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');

      for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.marginBottom =
         10 * parseInt(state.sectionSpacing)+ 'px';
      }
      localStorage.setItem('sectionSpacing', state.sectionSpacing);
    },
    changeParagraphSpacing(state, action) {
      state.paragraphSpacing = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');
   
      for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.marginTop =
          parseInt(state.paragraphSpacing) * 10 + 'px';
      }
      localStorage.setItem('paragraphSpacing', state.paragraphSpacing);
    },
    changeFontStyle(state, action)
     {
      state.fontStyle = action.payload;
      let cont = document.getElementsByClassName('paragraph');
      let heading = document.getElementsByClassName('resume-heading');
      for (let i = 0; i < cont.length || i < heading.length; i++) {
        if (i < cont.length) {
          cont[i].style.fontFamily = state.fontStyle;
        }
        if (i < heading.length) {
          heading[i].style.fontFamily = state.fontStyle;
        }
      }
      localStorage.setItem('fontStyle', state.fontStyle);
    }
    ,
    changeParagraphIndent(state, action) {
      state.paragraphIndentSize = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');
      for (let i = 0; i < paragraph.length; i++) {
        
        paragraph[i].style.marginLeft =
          20* parseInt(state.paragraphIndentSize) + 'px';
      }
      localStorage.setItem('paragraphIndentSize', state.paragraphIndentSize);
    }
    ,
  }
});
export const {
  changeFontSize,
  changeHeadingSize,
  changeLineSpacing,
  changeSectionSpacing,
  changeParagraphSpacing,
  changeParagraphIndent,
  changeFontStyle,
  changeParagraphRight
} = fontslice.actions;
export default fontslice.reducer;
