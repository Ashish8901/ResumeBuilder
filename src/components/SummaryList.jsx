import React from 'react';

const SummarylList = () => {
  return (
    <>
      <div className="skill-list-box">
        <ul>
          <li>
            <div className="add-rmv-btn">
              <button>add</button>
            </div>
            <div className="add-text">
              Enthusiastic{' '}
              <span style={{ color: 'var(--blue)' }}>[Job Title]</span> eager to
              contribute to team success through hard work, attention to detail
              and excellent organizational skills. Clear understanding of [Task]
              and training in{' '}
              <span style={{ color: 'var(--blue)' }}>[Skill]</span>. Motivated
              to learn, grow and excel in{' '}
              <span style={{ color: 'var(--blue)' }}>[Industry]</span>.
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SummarylList;
