import React, { useState } from 'react';
import ResumeFourEducation from './ResumeFourEducation';
import ResumeFourLanguge from './ResumeFourLanguge';
import ResumeFourSkill from './ResumeFourSkill';
import ResumeFourSocialInfo from './ResumeFourSocialInfo';
import ResumeFourSummary from './ResumeFourSummary';
import ResumeFourWorkHistory from './ResumeFourWorkHistory';
import { useSelector } from 'react-redux';
const TemplateFourStructure = () => {
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  // const removeSelectedImage = () => {
  //   setSelectedImage();
  // };
  const styles = {
    container: {
      display: 'block',
    },
    preview: {
      display: 'flex',
      flexDirection: 'column',
    },
    image: {
      maxWidth: '100%',
      maxHeight: 320,
      verticalAlign: 'middle',
      borderStyle: 'none',
      objectFit: 'cover',
      objectPosition: 'center',
      position: 'absolute',
      zIndex: 2,
      backgroundColor: '#fff',
    },
    delete: {
      cursor: 'pointer',
      padding: 15,
      background: 'red',
      color: 'white',
      border: 'none',
    },
    dummyImg: {
      height: '150px',
      width: '150px',
      backgroundColor: '#ccc',
      position: 'relative',
      zIndex: 1,
    },
    templateBorder: {
      border: '8px solid var(--blue)',
    },
  };

  const templateColorState = useSelector((store) => store.templateColor);
  return (
    <>
    
      <div
        className="resume-template-box resume-sec-temp"
        style={{
          padding: '8px',
          background:
            templateColorState.onMouseEnterBgClor === null
              ? templateColorState.backgroundColor
              : templateColorState.onMouseEnterBgClor,
        }}
      >
        <table className="resume-table" style={{ backgroundColor: '#fff' }}>
          <tbody>
            <tr>
              <td className="name-detail bg-white resume-pd-sec w-40 border-right">
                <div>
                  <div className="opacit-1">
                    <div className="addNew">
                      <div style={styles.container}>
                        <input
                          accept="image/*"
                          type="file"
                          onChange={imageChange}
                          className="img-upload-input"
                        />

                        <div style={styles.preview}>
                          <div
                            className="dummy-img"
                            style={styles.dummyImg}
                          ></div>
                          {selectedImage && (
                            <img
                              height={150}
                              width={150}
                              src={URL.createObjectURL(selectedImage)}
                              style={styles.image}
                              alt="Thumb"
                              className="resume-profile-img"
                            />
                          )}
                          {/* <button
                              onClick={removeSelectedImage}
                              style={styles.delete}
                            >
                              Remove This Image
                            </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="resume-pd-sec bg-light">
                <div>
                  <div className="opacit-1">
                    <div>
                      <h1>Your Name</h1>
                      <div
                        className="after-devider"
                        style={{
                          background:
                            templateColorState.onMouseEnterBgClor === null
                              ? templateColorState.backgroundColor
                              : templateColorState.onMouseEnterBgClor,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="fade-bg resume-pd-sec  border-right"
                style={{
                  background:
                    templateColorState.onMouseEnterBgClor === null
                      ? templateColorState.backgroundColor
                      : templateColorState.onMouseEnterBgClor,
                }}
              >
                <div>
                  <div className="opacit-1">
                    <ResumeFourSocialInfo />
                  </div>
                </div>
              </td>
              <td className="resume-pd-sec bg-light">
                <div>
                  <div className="opacit-1">
                    <ResumeFourSummary />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="fade-bg resume-pd-sec  border-right">
                <div className="opacit-1">
                  <ResumeFourSkill />
                  <ResumeFourEducation />
                </div>
              </td>
              <td className="resume-pd-sec bg-light">
                <ResumeFourWorkHistory />
                <ResumeFourLanguge />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TemplateFourStructure;
