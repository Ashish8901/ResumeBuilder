// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
// import { useSelector } from 'react-redux';
// const ResumeExtraSection = () => {
//   const styleobj = {
//     fontSize: '',
//   };
//   const navigate = useNavigate();
//   const pathname = window.location.pathname;
//   const customSectonState = useSelector(
//     (store) => store.customSectionData.sectionData
//   );

//   const handleClick = (id) => {
//     let path = `/add-del?customSecToken=${id}`;
//     navigate(path);
//   };
//   return (
//     <>
//       <div className="summay-box resume-extra-sec">
//         <div className="paragraph" style={styleobj}>
//           {pathname === '/choose-template' ? (
//             ''
//           ) : customSectonState.length > 0 ? (
//             <>
//               {customSectonState?.map((section) => {
//                 return (
//                   <>
//                     <h1
//                       onClick={() => handleClick(section.id)}
//                       className="resume-heading"
//                     >
//                       {section.title}
//                     </h1>
//                     <p> {ReactHtmlParser(section.description)}</p>
//                   </>
//                 );
//               })}
//             </>
//           ) : (
//             localStorage.getItem('name_state')
//           )}
//           {/* {pathname === '/choose-template' ? (
//           ''
//         ) :  ( 
//           <>
//             {customSectonState?.map((section) => {
//               return (
//                 <>
//                   <h1
//                     onClick={() => handleClick(section.id)}
//                     className="resume-heading"
//                   >
//                     {section.title}
//                   </h1>
//                   <p> {ReactHtmlParser(section.description)}</p>
//                 </>
//               );
//             })}
//           </>
//         )} */}

//           {/* {customSectonState?.custom_section?.length > 0 ? (
//           <>
//             {customSectonState?.custom_section?.map((section) => {
//               return (
//                 <>
//                  <h1 className="resume-heading">{section.meta_value.title}</h1>
//                   <p>{section.meta_value.title}</p>
//                 </>
//               );
//             })}
//           </>
//         ) : (
//           <>
//            <h1 className="resume-heading">Extra Section</h1>
//             <div className="singlecolumn">dummy data</div>
//           </>
//         )} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResumeExtraSection;
// // Motivated Sales Associate with 5 years of experience boosting sales
// //           and customer loyalty through individualized service. Resourceful
// //           expert at learning customer needs, directing to desirable merchandise
// //           and upselling to meet sales quotas. Committed to strengthening
// //           customer experiences with positivity and professionalism when
// //           answering requests and processing sales.
