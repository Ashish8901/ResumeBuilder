import React from 'react';
import { Link } from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const SummaryTemplateRight = () => {
  return (
    <>
      <div className="editor-box mt-3">
        <PageHeading label="Briefly tell us about your background" />
        <div className="mt-3">
          <CKEditor
            editor={ClassicEditor}
            data="<p>add here</p>"
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
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-6 col-2">
          <Link to="/summary" className="width-btn btn site-btn border-btn">
            Back
          </Link>
        </div>
        <div className="col-sm-6 col-10 text-right">
          <Link to="/add-section" className="btn site-btn bg-blue text-white">
          {t("NEXT")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SummaryTemplateRight;
