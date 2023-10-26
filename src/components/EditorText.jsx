import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorText = () => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
      />
    </>
  );
}

export default EditorText