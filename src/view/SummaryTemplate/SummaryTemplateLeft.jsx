import React, { useState } from 'react';

const SummaryTemplateLeft = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <p className="mb-0">Search by job title for pre-written examples</p>
        <form>
          <div className="form-group custom-search-box">
            <input
              className="search-input"
              autoComplete="off"
              onClick={() => setShow(!show)}
              type="text"
              placeholder="Title, industry, keyword"
              name="search"
            />
            <button type="submit" className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
          {show && (
            <div>
              <ul className="search-list" onClick={() => setShow(!show)}>
                <li>
                  <p className="mb-0 head-suggested">Suggested searches</p>
                  <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
                  <p className="mb-0">
                    <span className="seacrch-icon">
                      <i className="fa fa-search"></i>
                    </span>
                    Customer Service Cashier
                  </p>
                </li>
                <li>
                  <p className="mb-0">
                    <span className="seacrch-icon">
                      <i className="fa fa-search"></i>
                    </span>
                    Customer Service Representative
                  </p>
                </li>
                <li>
                  <p className="mb-0">
                    <span className="seacrch-icon">
                      <i className="fa fa-search"></i>
                    </span>
                    Cashier
                  </p>
                </li>
                <li>
                  <p className="mb-0">
                    <span className="seacrch-icon">
                      <i className="fa fa-search"></i>
                    </span>
                    Manager
                  </p>
                </li>
                <li>
                  <p className="mb-0">
                    <span className="seacrch-icon">
                      <i className="fa fa-search"></i>
                    </span>
                    Retailer
                  </p>
                </li>
                <li>
                  <p className="mb-0">
                    <span className="seacrch-icon">
                      <i className="fa fa-search"></i>
                    </span>
                    Server
                  </p>
                </li>
              </ul>
            </div>
          )}
        </form>
        <div className="fiter-search mt-4">
          <div className="fiter-search-left">
  
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
          </div>
          <div className="fiter-search-right">
            <div className="list-editor skill-list-editor">
         
              <div className="skill-list-box">
                <ul>
                  <li>
                    <div className="add-rmv-btn">
                      <button>add</button>
                    </div>
                    <div className="add-text">
                      Enthusiastic{' '}
                      <span style={{ color: 'var(--blue)' }}>[Job Title]</span>{' '}
                      eager to contribute to team success through hard work,
                      attention to detail and excellent organizational skills.
                      Clear understanding of [Task] and training in{' '}
                      <span style={{ color: 'var(--blue)' }}>[Skill]</span>.
                      Motivated to learn, grow and excel in{' '}
                      <span style={{ color: 'var(--blue)' }}>[Industry]</span>.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryTemplateLeft;
