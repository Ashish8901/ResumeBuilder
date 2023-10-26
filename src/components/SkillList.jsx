// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getSkillsListings } from '../redux/features/descriptionListingSlice';
// import { getAllSkillsSubCategories } from '../redux/features/subCategorySlice';
// const SkillList = () => {
//   const subCatData = useSelector((store) => store.subCategoryData);
//   console.log('subCatData', subCatData);

//   const resumeStateSkills = useSelector(
//     (store) => store.ListingsData.skillsListings.data
//   );
//   console.log('skillsListings', resumeStateSkills);

//   let jobData =
//     JSON.parse(localStorage.getItem('resume_meta_value_workexpr')) || null;
//   const searchTerm = jobData.jobtitle;
//   console.log(searchTerm);

//   const dispatch = useDispatch();
//   const resume_token = localStorage.getItem('resume_token') || null;

//   useEffect(() => {
//     const newArr = subCatData?.subCategories?.filter(
//       (el) => el.title === searchTerm
//     );
//     console.log('newArr', newArr);
//     dispatch(getSkillsListings(newArr[0]?.id));
//   }, [dispatch, searchTerm, subCatData?.subCategories]);

//   useEffect(() => {
//     if (resume_token) {
//       dispatch(getAllSkillsSubCategories());
//       dispatch(getSkillsListings({ meta_key: 'education', resume_token }));
//     }
//   }, [dispatch, resume_token]);
//   return (
//     <>
//       <div className="skill-list-box">
//         <ul>
//           {resumeStateSkills?.map((listing) => {
//             return (
//               <li key={listing.id}>
//                 <div className="add-rmv-btn">
//                   <button>add</button>
//                 </div>
//                 <div className="add-text">{listing.description}</div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default SkillList;
