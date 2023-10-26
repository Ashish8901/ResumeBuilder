// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useSearchParams } from 'react-router-dom';
// import DescrptionSection from './DescrptionSection';
// import {
//   addEducation,
//   editIndexData,
//   getEducation,
// } from '../redux/features/resumeSlice';
// import { getDegree } from '../redux/features/resumeSlice';
// const EducationForm = () => {
//   const resumeState = useSelector((store) => store.resumeData);

//   const [SearchParams] = useSearchParams();
//   const degreeObjectIndex = SearchParams.get('index');
//   console.log(degreeObjectIndex);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getDegree());
//   }, [dispatch]);

//   let meta_value =
//     JSON.parse(localStorage.getItem('resume_meta_value_education'))?.meta_value[
//       degreeObjectIndex ? degreeObjectIndex : null
//     ] || null;
//   const [sname, setSname] = useState('');
//   const [slname, setSLname] = useState('');
//   const [sdegree, setSDegree] = useState('');
//   const [fieldOStudy, setFieldOStudy] = useState('');
//   const [gMonth, setGMonth] = useState('');
//   const [gYear, setGYear] = useState('');
//   const [sdescription, setSDescription] = useState([]);

//   useEffect(() => {
//     const getData = () => {
//       setSname(meta_value?.sname);
//       setSLname(meta_value?.slname);
//       setSDegree(meta_value?.sdegree);
//       setFieldOStudy(meta_value?.fieldOStudy);
//       setGMonth(meta_value?.gMonth);
//       setGYear(meta_value?.gYear);
//       setSDescription(meta_value?.sdescription);
//     };
//     if (meta_value) getData();
//     // eslint-disable-next-line
//   }, []);

//   const resume_token = localStorage.getItem('resume_token');

//   useEffect(() => {
//     if (resume_token) {
//       if (meta_value) {
//         dispatch(getEducation({ meta_key: 'education', resume_token }));
//       }
//     }
//   }, [dispatch, resume_token]);

//   const saveEducation = async (e) => {
//     await dispatch(
//       addEducation({
//         data: {
//           sname,
//           slname,
//           sdegree,
//           fieldOStudy,
//           gMonth,
//           gYear,
//           sdescription,
//         },
//         resume_token,
//       })
//     ).catch((e) => {
//       console.log(e);
//     });
//   };
//   const editEducation = (degreeObjectIndex) => {
//     dispatch(
//       editIndexData({
//         data: {
//           sname,
//           slname,
//           sdegree,
//           fieldOStudy,
//           gMonth,
//           gYear,
//           sdescription,
//         },
//         resume_token,
//         degreeObjectIndex,
//       })
//     );
//   };
//   const YEAR = [];
//   for (let i = 1957; i <= new Date().getFullYear(); i++) {
//     YEAR.unshift(i);
//   }
//   return (
//     <>
//       <form className="resume-contact-form">
//         <div className="row">
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>School Name</label>
//               <input
//                 type="text"
//                 name="sname"
//                 value={sname}
//                 onChange={(e) => setSname(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. Oxford Software Institute & Oxford School of English"
//               />
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>School Location</label>
//               <input
//                 type="text"
//                 name="slname"
//                 value={slname}
//                 onChange={(e) => setSLname(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. New Delhi, India"
//               />
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>Degree</label>
//               <div className="slect-box">
//                 <span className="select-icon">
//                   <i className="fa fa-caret-down"></i>
//                 </span>
//                 <select
//                   className="form-control"
//                   name="sdegree"
//                   value={sdegree}
//                   onChange={(e) => setSDegree(e.target.value)}
//                 >
//                   <option hidden>Select</option>
//                   {resumeState?.degreeList?.map((data) => {
//                     return (
//                       <option value={data.title} key={data.id}>
//                         {data.title}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6"></div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>Field of Study</label>
//               <input
//                 type="text"
//                 name="fieldOStudy"
//                 value={fieldOStudy}
//                 onChange={(e) => setFieldOStudy(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. Financial Accounting"
//               />
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="form-group">
//               <label>Graduation Month</label>
//               <div className="slect-box">
//                 <span className="select-icon">
//                   <i className="fa fa-caret-down"></i>
//                 </span>

//                 <select
//                   className="form-control"
//                   name="gMonth"
//                   value={gMonth}
//                   onChange={(e) => setGMonth(e.target.value)}
//                 >
//                   <option hidden>Month</option>
//                   <option value="Jan">Jan</option>
//                   <option value="Feb">Feb</option>
//                   <option value="Mar">Mar</option>
//                   <option value="Apr">Apr</option>
//                   <option value="May">May</option>
//                   <option value="Jun">Jun</option>
//                   <option value="Jul">Jul</option>
//                   <option value="Aug">Aug</option>
//                   <option value="Sep">Sep</option>
//                   <option value="Oct">Oct</option>
//                   <option value="Nov">Nov</option>
//                   <option value="Dec">Dec</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-2">
//             <div className="form-group">
//               <label>Graduation Year</label>
//               <div className="slect-box">
//                 <span className="select-icon">
//                   <i className="fa fa-caret-down"></i>
//                 </span>
//                 <select
//                   className="form-control"
//                   name="gYear"
//                   onChange={(e) => setGYear(e.target.value)}
//                   value={gYear}
//                 >
//                   <option hidden>Year</option>
//                   {YEAR?.map((data) => {
//                     return (
//                       <option key={data} value={data}>
//                         {data}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//       <DescrptionSection
//         setSDescription={setSDescription}
//         sDescription={sdescription}
//       />
//       <div className="row mt-4">
//         <div className="col-sm-6 col-6">
//           <Link to="/resume-education" className="btn site-btn border-btn">
//             Back
//           </Link>
//         </div>
//         <div className="col-sm-6 col-6 text-right">
//           <Link to="/edu-summary">
//             <button
//               type="button"
//               className="btn site-btn bg-blue text-white"
//               onClick={() => {
//                 if (degreeObjectIndex || degreeObjectIndex == null) {
//                   editEducation(degreeObjectIndex);
//                 } else {
//                   saveEducation();
//                 }
//               }}
//             >
//               NEXT
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EducationForm;
