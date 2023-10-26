import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEduDescription } from "../redux/features/descriptionListingSlice";
import { useTranslation } from "react-i18next";
const DescrptionSection = ({
  setSDescription,
  sDescription,
  handleRemoval,
}) => {
  const { t } = useTranslation();
  const [lvalue, setLvalue] = useState([]);

  const [description, setDescription] = useState(sDescription);

  const descriptionListing = useSelector((store) => store.ListingsData);

  useEffect(() => {
    setSDescription(description);
  }, [description, setSDescription]);

  // useEffect(() => {

  //     setDescription(sDescription);

  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEduDescription());
  }, [dispatch]);
  const userData = descriptionListing.listings.data;

  const handleChange = (e) => {
    let str = "";
    let descriptionString = str.concat(...description);
    let newArr = lvalue;
    if (newArr.includes(e.target.value)) {
      newArr = [...lvalue];
      const indexOfValue = newArr.indexOf(e.target.value);
      newArr.splice(indexOfValue, 1);
      const updatedArray = handleRemoval(e.target.value, descriptionString);
      // const replacedString = descriptionString.replace(
      //   `<li>${e.target.value}</li>`,
      //   ''
      // );
      setLvalue(newArr);
      setDescription(updatedArray);
    } else {
      newArr.push(e.target.value);
      setLvalue(newArr);
      if (!descriptionString.includes(`<li>&nbsp;</li>`)) {
        setDescription(descriptionString.concat(`<li>${e.target.value}</li>`));
      } else {
        const replaceNBSP = descriptionString.replace("&nbsp;", e.target.value);
        setDescription(replaceNBSP);
      }
    }
  };
  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setDescription(data);

    let arr = [...lvalue];
    let splArr = [];
    const userNames = userData.map((user) => user.name);
    for (let i of userNames) {
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
    // setSDescription(description);
  };

  return (
    <>
      <div id="accordion">
        <div className="card des-card">
          <div className="card-des-box" id="headingOne">
            <p
              className="btn mb-0 f-14"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span className="acc-icon-plus">
                <i className="fa fa-plus"></i>
              </span>
              {t("Add a description to this section")}
            </p>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="desc-card-body">
              <div className="editor-wrapper">
                <div className="list-editor">
                  <ul className="list-editor-inner mb-0">
                    {userData?.map((listingData) => {
                      return (
                        <li className="list-editor-item" key={listingData.id}>
                          <div className="item-left">
                            {/* <input
                                type="checkbox"
                                name="text"
                                value={listingData.description}
                              /> */}
                            <button
                              style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                color: " #fff",
                                whiteSpace: "nowrap",
                                // display: 'none',
                              }}
                            >
                              {!description.includes(listingData.description)
                                ? " addieren"
                                : "Entfernen"}
                            </button>
                            <input
                              className="item-right"
                              type="checkbox"
                              checked={
                                lvalue.indexOf(listingData.description) > -1
                              }
                              value={listingData.description}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="text-german">
                            <div className="item-right">
                              <p className="mb-0">
                                {listingData.description}&nbsp;
                                <span style={{ color: "var(--blue)" }}>
                                  [subject]
                                </span>
                              </p>
                            </div>
                          </div>
                          <div></div>
                        </li>
                      );
                    })}

                    {/* <li className="list-editor-item">
                      <div className="item-left">
                        <button></button>
                      </div>
                      <div className="item-right">
                        <p className="mb-0">
                          Member of &nbsp;
                          <span style={{ color: 'var(--blue)' }}>
                            [Honor's Society Name]
                          </span>
                        </p>
                      </div>
                    </li> */}
                  </ul>
                </div>
                <div className="draft-editor-box">
                  <CKEditor
                    config={{
                      toolbar: [
                        "bold",
                        "italic",
                        "bulletedList",
                        "undo",
                        "redo",
                        "underline",
                      ],
                    }}
                    editor={ClassicEditor}
                    data={sDescription ? sDescription : description}
                    onChange={handleCkeditorState}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescrptionSection;
