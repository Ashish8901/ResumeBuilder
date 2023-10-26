import React from 'react';
import { useSelector } from 'react-redux';

const UploadSignBox = () => {
  const pathname = window.location.pathname;
  const signatureResData = useSelector((store) => store.signatureData);
  // console.log('signatureResDataBox', signatureResData);
  return (
    <>
      {pathname !== '/final-resume' ? (
        <>
          <div
            className={`upload-sign text-${signatureResData.alignment}`}
            style={{
              fontFamily: `${signatureResData?.style?.fontFamily}`,
              fontStyle: `${signatureResData?.style?.fontStyle}`,
              fontSize: `${signatureResData?.textsize}px`,
              color: `${signatureResData?.color}`,
            }}
          >
            {signatureResData.signdata ? (
              <img
                style={{
                  height: '100%',
                  width: `${signatureResData?.signSize}px`,
                }}
                src={signatureResData.signdata}
                alt=""
              />
            ) : signatureResData.imagedata ? (
              <img
                alt=""
                style={{
                  filter: `contrast(${signatureResData.contrast}%)`,
                  height: 'auto',
                  maxWidth: `${signatureResData?.imageSize}px`,
                }}
                src={signatureResData.imagedata}
              />
            ) : (
              signatureResData.text
            )}
          </div>

          {signatureResData.ischeck ? (
            <div className={`upload-sign text-${signatureResData?.alignment}`}>
              {signatureResData.text} {signatureResData.location}{' '}
              {signatureResData.date}
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <div>
            <div
              className={`upload-sign text-${signatureResData?.SignResponse?.adjustment}`}
              style={{
                fontFamily: `${signatureResData?.SignResponse?.style?.fontFamily}`,
                fontStyle: `${signatureResData?.SignResponse?.style?.fontStyle}`,
                fontSize: `${signatureResData?.SignResponse?.textSize}px`,
                color: `${signatureResData?.SignResponse?.color}`,
              }}
            >
              {signatureResData?.SignResponse?.sign ? (
                <img
                  style={{
                    height: '100%',
                    width: `${signatureResData?.signSize}px`,
                  }}
                  src={signatureResData.SignResponse?.sign}
                  alt=""
                />
              ) : signatureResData?.SignResponse?.upload ? (
                <img
                  alt=""
                  style={{
                    filter: `contrast(${signatureResData.contrast}%)`,
                    height: 'auto',
                    maxWidth: `${signatureResData?.SignResponse.imageSize}px`,
                  }}
                  src={signatureResData?.SignResponse?.upload}
                />
              ) : (
                signatureResData?.SignResponse?.text
              )}
            </div>

            {signatureResData.SignResponse.addDateAndPlace ? (
              <div
                className={`upload-sign text-${signatureResData.SignResponse?.adjustment}`}
              >
                {signatureResData.SignResponse.text}{' '}
                {signatureResData.SignResponse.location}{' '}
                {signatureResData.SignResponse.date}
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UploadSignBox;
