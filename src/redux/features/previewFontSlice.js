import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  fontSize: localStorage.getItem('customFontSize') || '11',
  headingSize: localStorage.getItem('customHeadingSize') || '18',
  lineSpacing: localStorage.getItem('lineSpacing') || '2',
  sectionSpacing: localStorage.getItem('sectionSpacing') || '1',
  paragraphSpacing: localStorage.getItem('paragraphSpacing') || '2',
  paragraphIndentSize: localStorage.getItem('paragraphIndentSize') || '0',
  fontStyle: localStorage.getItem('fontStyle') || 'Montserrat',
  
};
const previewFontSlice = createSlice({
  name: 'previewfontsize',
  initialState,
  reducers: {
    changeFontSize(state, action) {
      state.fontSize = action.payload;
      let title = document.getElementsByClassName('name-title');
      let paragraph = document.getElementsByClassName('paragraph');
      for (let i = 0; i < title.length || i < paragraph.length; i++) {
        if (i < title.length) {
          title[i].style.fontSize = parseInt(state.fontSize) + 15 + 'px';
        }
        if (i < paragraph.length) {
          paragraph[i].style.fontSize = parseInt(state.fontSize) + 5 + 'px';
        }
      }
   
    },
    changeHeadingSize(state, action) {
      state.headingSize = action.payload;
      let heading = document.getElementsByClassName('resume-heading');
      for (let i = 0; i < heading.length; i++) {
        if (i < heading.length) {
          heading[i].style.fontSize = parseInt(state.headingSize) + 1.5 + 'px';
        }
      }
     
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
     
    },
    changeSectionSpacing(state, action) {
      state.sectionSpacing = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');

      for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.marginBottom =
         3 + parseInt(state.sectionSpacing)+ 'px';
      }
      
    },
    changeParagraphSpacing(state, action) {
      state.paragraphSpacing = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');
   
      for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.marginTop =
          parseInt(state.paragraphSpacing) + 3 + 'px';
      }
     
    },
    changeFontStyle(state, action) {
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
    
    },
    changeParagraphIndent(state, action) {
      state.paragraphIndentSize = action.payload;
      let paragraph = document.getElementsByClassName('paragraph');
      for (let i = 0; i < paragraph.length; i++) {
        
        paragraph[i].style.marginLeft =
          20* parseInt(state.paragraphIndentSize) + 'px';
      }
      
    },
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
} = previewFontSlice.actions;
export default previewFontSlice.reducer;
