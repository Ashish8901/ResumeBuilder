// import React, { useState } from 'react';
// import SkillList from '../../components/SkillList';
// import SkillSearchList from './SkillSearchList';

// const SkillTemplateLeft = () => {
//   const [show, setShow] = useState(false);
//   let jobData = JSON.parse(localStorage.getItem('resume_meta_value_workexpr'));
//   console.log(jobData);
//   return (
//     <>
//       <div>
//         <p className="mb-0">Title, industry, keyword</p>
//         <form>
//           <div className="form-group custom-search-box">
//             <input
//               className="search-input"
//               autoComplete="off"
//               onClick={() => setShow(!show)}
//               type="text"
//               value={jobData.jobtitle}
//               placeholder="Title, industry, keyword"
//               name="search"
//             />
//             <button type="submit" className="search-btn">
//               <i className="fa fa-search"></i>
//             </button>
//           </div>
//           {show && (
//             <div>
//               <ul className="search-list" onClick={() => setShow(!show)}>
//                 <li>
//                   <p className="mb-0 head-suggested">Suggested searches</p>
//                   <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
//                   <p className="mb-0">
//                     <span className="seacrch-icon">
//                       <i className="fa fa-search"></i>
//                     </span>
//                     Customer Service Cashier
//                   </p>
//                 </li>
//                 <li>
//                   <p className="mb-0">
//                     <span className="seacrch-icon">
//                       <i className="fa fa-search"></i>
//                     </span>
//                     Customer Service Representative
//                   </p>
//                 </li>
//                 <li>
//                   <p className="mb-0">
//                     <span className="seacrch-icon">
//                       <i className="fa fa-search"></i>
//                     </span>
//                     Cashier
//                   </p>
//                 </li>
//                 <li>
//                   <p className="mb-0">
//                     <span className="seacrch-icon">
//                       <i className="fa fa-search"></i>
//                     </span>
//                     Manager
//                   </p>
//                 </li>
//                 <li>
//                   <p className="mb-0">
//                     <span className="seacrch-icon">
//                       <i className="fa fa-search"></i>
//                     </span>
//                     Retailer
//                   </p>
//                 </li>
//                 <li>
//                   <p className="mb-0">
//                     <span className="seacrch-icon">
//                       <i className="fa fa-search"></i>
//                     </span>
//                     Server
//                   </p>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </form>
//         <div className="fiter-search mt-4">
//           <div className="fiter-search-left">
//             <SkillSearchList />
//           </div>
//           <div className="fiter-search-right">
//             <div className="list-editor skill-list-editor">
//               <SkillList />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SkillTemplateLeft;
