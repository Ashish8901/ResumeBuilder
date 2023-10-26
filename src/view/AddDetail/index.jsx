import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import {
  addCustomSectionOne,
  deleteCustomSectionOne,
  editCustomSectionOne,
  // getSingleCustomSection,
} from '../../redux/features/customSectionSlice';
import axios from 'axios';
import { Button } from 'reactstrap';

const Index = () => {
  const dispatch = useDispatch();
  const [SearchParams] = useSearchParams();
  const degreeObjectIndex = SearchParams.get('customSecToken');
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const name = JSON.parse(localStorage.getItem('sectionHead'));
  const resume_token = localStorage.getItem('resume_token') || null;

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSectionName = () => {
    setSectionName(name);
  };

  const handleCustomSection = () => {
    if (degreeObjectIndex === null && sectionDescription && sectionName) {
      const filterSection = customDetailsArr.find(
        (section) => section.title === sectionName
      );

      if (filterSection) {
        dispatch(
          editCustomSectionOne({
            id: filterSection.id,
            data: { title: sectionName, description: sectionDescription },
          })
        );
      } else {
        dispatch(
          addCustomSectionOne({
            data: {
              title: sectionName,
              description: sectionDescription,
            },
            resume_token,
          })
        );
      }
    } else if (
      degreeObjectIndex !== null &&
      sectionDescription &&
      sectionName
    ) {
      dispatch(
        editCustomSectionOne({
          id: degreeObjectIndex,
          data: { title: sectionName, description: sectionDescription },
        })
      );
    }

    localStorage.setItem('sectionHead', null);
    navigate('/final-resume');
  };

  const customDetailsArr = useSelector(
    (store) => store.customSectionData.sectionData
  );

  const handleCkEditor = (event, editor) => {
    const data = editor.getData();
    setSectionDescription(data);
  };
  const getSingleCustomSection = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resume/custom-section/${id}`,
        {
          meta_key: 'custom-section',
        }
      );
      const data = response.data;

      setSectionDescription(data?.meta_value?.description);
      setSectionName(data.meta_value?.title);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const setData = () => {
      if (degreeObjectIndex !== null) {
        getSingleCustomSection(degreeObjectIndex);
      } else {
        if (customDetailsArr?.length > 0 && name === null) {
          setSectionDescription(customDetailsArr[0]?.description);
          setSectionName(customDetailsArr[0]?.title);
        } else {
          handleSectionName();
        }
      }
    };
    setData();
    // eslint-disable-next-line
  }, [customDetailsArr, degreeObjectIndex]);

  const handleDeleteSection = (id) => {
    handleClose();
    let path = '/final-resume';
    if (degreeObjectIndex === null && sectionDescription === '') {
      localStorage.setItem('sectionHead', null);
      navigate(path);
    } else {
      dispatch(deleteCustomSectionOne(id));
      navigate(path);
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"This section can't be empty."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill it out or it will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Keep Editing
          </Button>
          <Button
            onClick={() => handleDeleteSection(degreeObjectIndex)}
            autoFocus
          >
            Discard Section
          </Button>
        </DialogActions>
      </Dialog>
      <>
        <section className="choose-template-section pt-4">
          <h1>
            {degreeObjectIndex === null ? '' : `${sectionName?.toUpperCase()}`}
          </h1>
          <div className="container">
            <div className="mb-5">
              <PageHeading
                headinglabel={
                  degreeObjectIndex !== null
                    ? `Showcase your ${sectionName} to an employer`
                    : sectionName
                    ? `Tell us about your Deatils ${sectionName}`
                    : 'Tell us about your Deatils'
                }
              />
            </div>
            <CKEditor
              config={{
                toolbar: [
                  'bold',
                  'italic',
                  'bulletedList',
                  'numberedList',
                  'blockQuote',
                  'heading',
                ],
              }}
              editor={ClassicEditor}
              data={sectionDescription ? sectionDescription : ''}
              onChange={handleCkEditor}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
            <div className="row mt-4">
              <div className="col-sm-6 col-4">
                <Link to="/add-section" className="btn site-btn border-btn">
                  Back
                </Link>
              </div>
              <div className="col-sm-6 col-8 text-right">
                <button
                  type="button"
                  onClick={() => {
                    if (sectionDescription) {
                      handleCustomSection();
                    } else {
                      handleClickOpen();
                    }
                  }}
                  className="btn site-btn bg-blue text-white"
                >
                  {localStorage.getItem('FinalResume') === 'true'
                    ? 'SAVE AND NEXT'
                    : 'NEXT'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
      )
    </>
  );
};

export default Index;
