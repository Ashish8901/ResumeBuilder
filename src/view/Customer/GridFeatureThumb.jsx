// import React from "react";
// import ResumeImg from "../../assets/resume-2.png";
// import { Link } from "react-router-dom";

// const GridFeatureThumb = ({ item }) => {
//   const currentDate = new Date();
//   // eslint-disable-next-line
//   const date = `${currentDate.getDate()}/${
//     currentDate.getMonth() + 1
//   }/${currentDate.getFullYear()}`;

//   return (
//     <>
//       <div className="feature-thumbnail ">
//         <img className="thumb-img" src={ResumeImg} alt="" />

//         <div className="feature-thumb-bottom">
//           <div className="resume-info-container ">
//             <h6>{item && item.resume_name}</h6>
//             <div className="resume-info">
//               <div>
//                 <span>
//                   Modified:{" "}
//                   {new Date(
//                     item && item.resume_details[0]?.updated_at
//                   ).toDateString()}
//                 </span>
//                 <br />
//                 <span>
//                   Created:{" "}
//                   {new Date(
//                     item && item.resume_details[0]?.created_at
//                   ).toDateString()}
//                 </span>
//               </div>
//               <div className="text-center">
//                 <Link to="/payment">
//                   <span className="doc-Strength-label">Strength</span>
//                   <span className="doc-strength-value">73</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="thumbnail-links">
//             <div className="resume-list-tool grid-tool">
//               <div className="list-tool">
//                 <Link to="/payment">
//                   <span>
//                     <i className="fa fa-check-circle-o" aria-hidden="true"></i>
//                   </span>
//                   <span>Check</span>
//                 </Link>
//               </div>
//               <div className="list-tool">
//                 <Link to="/final-resume">
//                   <span>
//                     <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
//                   </span>
//                   <span>Edit</span>
//                 </Link>
//               </div>
//               <div className="list-tool">
//                 <Link to="/final-resume">
//                   <span>
//                     <i className="fa fa-download" aria-hidden="true"></i>
//                   </span>
//                   <span>Download</span>
//                 </Link>
//               </div>
//               <div className="list-tool">
//                 <Link to="/payment">
//                   <span>
//                     <i className="fa fa-print" aria-hidden="true"></i>
//                   </span>
//                   <span>Print</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GridFeatureThumb;
