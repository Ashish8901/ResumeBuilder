import React, { useEffect, useRef, useState } from 'react';
import { OptionsData } from './optionsData';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  alignmentReducer,
  colorReducer,
  textsizeReducer,
  styleReducer,
  textReducer,
} from '../../redux/features/signatureSlice';

const Dropdown = ({
  setStyleObject,
  styleObject,
  setTextSignature,
}) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const NameData = JSON.parse(
    localStorage.getItem('resume_meta_value_heading')
  );
  const signatureData = useSelector(
    (store) => store.signatureData?.SignResponse
  );

  const [textValue, setTextValue] = useState(
    signatureData.text
      ? signatureData.text
      : NameData.fname + ' ' + NameData.lname
  );
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [optionsData, setOptionsData] = useState({});
  const [textSize, setTextSize] = useState(20);
  const [alignment, setAlignment] = useState(
    signatureData.adjustment ? signatureData.adjustment : 'left'
  );

  const handleDropDownValue = (text) => {
    setTextValue(text);
  };
  const handleOptionData = (id, style) => {
    const data = OptionsData.find((tab) => tab.id === id);
    setOptionsData(data);
    setIsDivOpen(false);
    setTextSignature({
      name: textValue ? textValue : NameData.fname + ' ' + NameData.lname,
      style: style
        ? style
        : {
            fontStyle: 'normal',
            fontFamily: 'Italianno',
            color: 'black',
          },
    });
    dispatch(styleReducer(style));
    return data;
  };
  const increaseTextSize = () => {
    if (textSize < 24) {
      const newSize = textSize + 2;
      setTextSize(newSize > 24 ? 24 : newSize);
      dispatch(textsizeReducer(`${newSize > 24 ? 24 : newSize}`));
      setStyleObject({
        ...styleObject,
        size: `${newSize > 24 ? 24 : newSize}px`,
      });
    }
  };

  const decreaseTextSize = () => {
    if (textSize > 16) {
      const newSize = textSize - 2;
      setTextSize(newSize < 16 ? 16 : newSize);
      dispatch(textsizeReducer(`${newSize < 16 ? 16 : newSize}`));
      setStyleObject({
        ...styleObject,
        size: `${newSize < 16 ? 16 : newSize}px`,
      });
    }
  };
  const handleAlignmentChange = (newAlignment) => {
    setAlignment(newAlignment);
    dispatch(alignmentReducer(newAlignment));
    setStyleObject({ ...styleObject, align: newAlignment });
  };
  useEffect(() => {
    dispatch(textReducer(textValue));
    dispatch(alignmentReducer(alignment));
    dispatch(
      textsizeReducer(
        signatureData.textSize ? signatureData.textSize : textSize
      )
    );
    // eslint-disable-next-line
  }, [textValue, dispatch, alignment]);
  const handleColourChange = (value) => {
    if (value === 'black') {
      dispatch(colorReducer('black'));
      setStyleObject({ ...styleObject, color: 'black' });
    } else {
      dispatch(colorReducer('blue'));

      setStyleObject({ ...styleObject, color: 'blue' });
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDivOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="customSelect-outer" ref={dropdownRef}>
        <div className="customSelect ">
          <input
            type="text"
            onClick={() => setIsDivOpen(true)}
            onChange={(e) => handleDropDownValue(e.target.value)}
            value={textValue}
            className="form-control"
            style={
              optionsData?.style
                ? optionsData?.style
                : signatureData.style
                ? signatureData.style
                : {
                    fontStyle: 'normal',
                    fontFamily: 'Italianno',
                    color: 'black',
                  }
            }
          />
          <i className="fa fa-chevron-down"></i>
        </div>
        {isDivOpen && (
          <div>
            <ul className="customSelectList ">
              {OptionsData.map((item) => {
                return (
                  <li
                    style={item.style}
                    onClick={() => handleOptionData(item.id, item.style)}
                  >
                    {textValue}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="text-formater-box mt-4">
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">ANPASSUNG</label>
          </div>
          <div>
            <button
              className={
                alignment === 'left'
                  ? 'format-icon active-formate'
                  : 'format-icon'
              }
              onClick={() => {
                handleAlignmentChange('left');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-text-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <button
              className={
                alignment === 'center'
                  ? 'format-icon active-formate'
                  : 'format-icon'
              }
              onClick={() => {
                handleAlignmentChange('center');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-text-center"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <button
              className={
                alignment === 'right'
                  ? 'format-icon active-formate'
                  : 'format-icon'
              }
              onClick={() => {
                handleAlignmentChange('right');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-text-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">FARBE</label>
          </div>
          <ul className="uploadsign-color-list inline-block resume-color-list pl-0">
            <li className="color-item">
              <label className="color-selector">
                <input
                  className="color-input"
                  type="radio"
                  name="radio-color"
                  onChange={() => handleColourChange('black')}
                />
                <span
                  className="color-selector-radio root-color"
                  style={{
                    backgroundColor: 'var(--success-steel)',
                  }}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </label>
            </li>
            <li className="color-item">
              <label className="color-selector">
                <input
                  className="color-input"
                  type="radio"
                  name="radio-color"
                  onChange={() => handleColourChange('blue')}
                />

                <span
                  className="color-selector-radio"
                  style={{
                    backgroundColor: 'var(--navy-blue)',
                  }}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          <div className="resume-contact-form">
            <label className="mb-0">GRÖSS</label>
          </div>
          <div className="font-formating">
            <button className="font-formating-text" onClick={decreaseTextSize}>
              -<i className="fa fa-font fa-xs" aria-hidden="true"></i>
            </button>
            <button className="font-formating-text" onClick={increaseTextSize}>
              +<i className="fa fa-font fa-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
