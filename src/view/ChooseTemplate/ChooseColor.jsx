import { React } from 'react';

const ChooseColor = ({ setColor }) => {
 
  return (
    <>
      <ul className="inline-block resume-color-list">
        <li className="color-item ">
          <label className="color-selector root-color">
            <input
              className="color-input"
              type="radio"
              name="radio-color"
              value={"var(--default-template)"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--rootcolor)" }}
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
              value={"var(--success-steel)"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              className="color-selector-radio root-color"
              style={{ backgroundColor: "var(--success-steel)" }}
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
              value={"var(--essential-ecru)"}
              onChange={(e) => setColor(e.target.value)}
            />

            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--essential-ecru)" }}
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
              value={"var(--clever-blue)"}
              onChange={(e) => setColor(e.target.value)}
            />

            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--clever-blue)" }}
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
              value={"var(--quality-azure)"}
              onChange={(e) => setColor(e.target.value)}
            />

            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--quality-azure)" }}
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
              value={"var(--delight-mint)"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--delight-mint)" }}
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
              value={"var(--standout-ruby)"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--standout-ruby)" }}
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
              value={"var(--savvy-salmon)"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--savvy-salmon)" }}
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
              value={"var(--optimistic-amber)"}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              className="color-selector-radio"
              style={{ backgroundColor: "var(--optimistic-amber)" }}
            >
              <i className="fa fa-check" aria-hidden="true"></i>
            </span>
          </label>
        </li>
      </ul>
    </>
  );
};

export default ChooseColor;
