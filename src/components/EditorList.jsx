import React from 'react'

const EditorList = () => {
  return (
    <>
      <ul className="list-editor-inner mb-0">
        <li className="list-editor-item">
          <div className="item-left">
            <input type="checkbox" name="text" />
            <button></button>
          </div>
          <div className="item-right">
            <p className="mb-0">
              Professional development completed in&nbsp;
              <span style={{ color: "var(--blue)" }}>[subject]</span>
            </p>
          </div>
        </li>
        <li className="list-editor-item">
          <div className="item-left">
            <input type="checkbox" name="text" />
            <button></button>
          </div>
          <div className="item-right">
            <p className="mb-0">
              Member of &nbsp;
              <span style={{ color: "var(--blue)" }}>
                [Honor's Society Name]
              </span>
            </p>
          </div>
        </li>
        <li className="list-editor-item">
          <div className="item-left">
            <input type="checkbox" name="text" />
            <button></button>
          </div>
          <div className="item-right">
            <p className="mb-0">
              Awarded &nbsp;
              <span style={{ color: "var(--blue)" }}>[Award Name]</span>
            </p>
          </div>
        </li>
        <li className="list-editor-item">
          <div className="item-left">
            <input type="checkbox" name="text" />
            <button></button>
          </div>
          <div className="item-right">
            <p className="mb-0">
              Professional development completed in&nbsp;
              <span style={{ color: "var(--blue)" }}>[subject]</span>
            </p>
          </div>
        </li>
        <li className="list-editor-item">
          <div className="item-left">
            <input type="checkbox" name="text" />
            <button></button>
          </div>
          <div className="item-right">
            <p className="mb-0">
              Elected to{" "}
              <span style={{ color: "var(--blue)" }}>[Elected Position]</span>{" "}
              for{" "}
              <span style={{ color: "var(--blue)" }}>
                [Student Organization, Fraternity or Sorority]
              </span>
              &nbsp;in&nbsp;<span style={{ color: "var(--blue)" }}>[Year]</span>
            </p>
          </div>
        </li>
        <li className="list-editor-item">
          <div className="item-left">
            <input type="checkbox" name="text" />
            <button></button>
          </div>
          <div className="item-right">
            <p className="mb-0">
              Received &nbsp;
              <span style={{ color: "var(--blue)" }}>[Scholarship Name]</span>
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}

export default EditorList