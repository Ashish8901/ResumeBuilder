import React from 'react'

const SummarySearchList = () => {
  return (
    <>
      
      <div className="search-key-box">
        <p>Popular Job Titles</p>
        <ul className="search-key-list">
          <li>
            <div className="key-icon">
              <i className=" fa fa-search"></i>
            </div>
            <div>Cashier</div>
          </li>
          <li>
            <div className="key-icon">
              <i className=" fa fa-search"></i>
            </div>
            <div>Customer Service Representative</div>
          </li>
          <li>
            <div className="key-icon">
              <i className=" fa fa-search"></i>
            </div>
            <div>Manager</div>
          </li>
          <li>
            <div className="key-icon">
              <i className=" fa fa-search"></i>
            </div>
            <div>Server</div>
          </li>
          <li>
            <div className="key-icon">
              <i className=" fa fa-search"></i>
            </div>
            <div>Retailer</div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SummarySearchList