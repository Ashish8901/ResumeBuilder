import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import PreviewTips from "../../components/PreviewTips";
import ResumeContactPreview from '../../components/ResumeContactPreview';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const EducationDescription = () => {
  const [description, setDescription] = useState('');
  const { t } = useTranslation();
  const [lvalue, setLvalue] = useState([]);
  const skillsListing = useSelector(
    (store) => store.ListingsData.skillsListings.data
  );

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
    let arr = [...lvalue];
    let splArr = [];
    const skillLists = skillsListing.map((skill) => skill.description);
    for (let i of skillLists) {
      if (data.length === 0) {
        arr = [];
        setLvalue(arr);
      }
      if (!data.includes(i) && arr.includes(i)) {
        splArr.push(i);
        let filteredArr = arr.filter(function (val) {
          return splArr.indexOf(val) === -1;
        });

        setLvalue(filteredArr);
      } else {
        if (data.includes(i) && !arr.includes(i)) {
          arr.push(i);
          setLvalue(arr);
        }
      }
    }
  };

  return (
    <>
      <section className="choose-template-section summary-box pt-4 bg-double pb-5">
        <div className="container">
          <div className="pd-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="">
                  <div className="editor-box mt-3 ">
                    <h1 className="page-title-big mb-4">
                      Beschreiben Sie Ihre
                      <span style={{ color: 'var(--yellow)' }}>
                        Ausbildung&nbsp;
                      </span>
                    </h1>

                    <div className="mt-3">
                      <CKEditor
                        config={{
                          toolbar: [
                            'bold',
                            'italic',
                            'bulletedList',

                            'undo',
                            'redo',
                            'underline',
                          ],
                        }}
                        editor={ClassicEditor}
                        data={description}
                        onChange={handleCkeditorState}
                        // onReady={(editor) => {}}
                        // onBlur={(event, editor) => {}}
                        // onFocus={(event, editor) => {}}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-10">
                  <div className="col-sm-6 col-3">
                    <button
                      // onClick={handleBack}
                      className="width-btn btn site-btn border-btn"
                    >
                      {t('Back')}
                    </button>
                  </div>
                  <div className="col-sm-6 col-9 text-right">
                    <button
                      className="btn site-btn bg-blue text-white"
                      type="button"
                      // onClick={saveSkills}
                    >
                      {localStorage.getItem('FinalResume') === 'true'
                        ? `${'SAVE AND NEXT'}`
                        : `${'WEITER'}`}{' '}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                {/* <PreviewTips /> */}
                <ResumeContactPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationDescription;
