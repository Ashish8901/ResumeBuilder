// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addWorkExpr,
//   editJobData,
// } from '../redux/features/workExperienceSlice';
// import { Modal } from 'reactstrap';
// const WorkHistoryForm = () => {
//   const router = useNavigate();
//   useSelector((store) => store.workExprData);
//   const [SearchParams] = useSearchParams();
//   const jobObjectIndex = SearchParams.get('index');
//   const dispatch = useDispatch();
//   const resume_token = localStorage.getItem('resume_token') || null;

//   let meta_value =
//     JSON.parse(localStorage.getItem('resume_meta_value_workexpr'))?.meta_value[
//       jobObjectIndex ? jobObjectIndex : null
//     ] || null;

//   const [jobtitle, setJobtitle] = useState('');
//   const [employer, setEmployer] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [city, setCity] = useState('');
//   const [country, setCountry] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const defaultValues = {
//     jobtitle,
//     employer,
//     pincode,
//     city,
//     country,
//     startDate,
//     endDate,
//   };
//   useEffect(() => {
//     const getData = () => {
//       setJobtitle(meta_value?.jobtitle);
//       setEmployer(meta_value?.employer);
//       setPincode(meta_value?.pincode);
//       setCity(meta_value?.city);
//       setCountry(meta_value?.country);
//       setStartDate(new Date(meta_value?.start_date));
//       setEndDate(new Date(meta_value?.end_date));
//     };
//     if (meta_value) getData();
//     // eslint-disable-next-line
//   }, []);
//   const saveWorkExpr = () => {
//     dispatch(
//       addWorkExpr({
//         data: {
//           jobtitle,
//           employer,
//           city,
//           country,
//           pincode,
//           start_date: startDate,
//           end_date: endDate,
//         },
//         resume_token,
//       })
//     ).catch((e) => {
//       console.log(e);
//     });
//   };
//   const editJob = (jobObjectIndex) => {
//     console.log('degreeObjectIndexandrVala', jobObjectIndex);
//     dispatch(
//       editJobData({
//         data: {
//           jobtitle,
//           employer,
//           city,
//           country,
//           pincode,
//           start_date: startDate,
//           end_date: endDate,
//         },
//         resume_token,
//         jobObjectIndex,
//       })
//     );
//   };
//   const [modalOpen, setModalOpen] = useState(false);
//   const [check, setCheck] = useState(false);
//   const handleCheck = (e) => {
//     setCheck(!check);
//   };
//   console.log(defaultValues);
//   return (
//     <>
//       <form className="resume-contact-form">
//         <div className="row">
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>Job Title</label>
//               <input
//                 type="text"
//                 name="jobtitle"
//                 value={jobtitle}
//                 onChange={(e) => setJobtitle(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. Retail Sales Associate"
//               />
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>Employer</label>
//               <input
//                 type="text"
//                 name="employer"
//                 value={employer}
//                 onChange={(e) => setEmployer(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. H&M"
//               />
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. New Delhi"
//               />
//             </div>
//           </div>
//           <div className="col-lg-3">
//             <div className="form-group">
//               <label>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. India"
//               />
//             </div>
//           </div>
//           <div className="col-lg-3">
//             <div className="form-group">
//               <label>Pin Code</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 110034"
//               />
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>Start Date</label>
//               <div className="date-picker-box">
//                 <span className="calendar-icon">
//                   <i className="fa fa-calendar" aria-hidden="true"></i>
//                 </span>
//                 <DatePicker
//                   className="form-control"
//                   name="start_date"
//                   closeOnScroll={(e) => e.target === document}
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   placeholderText="Select"
//                   showYearDropdown
//                   scrollableMonthYearDropdown
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <label>End Date</label>
//               <div className="date-picker-box">
//                 <span className="calendar-icon">
//                   <i className="fa fa-calendar" aria-hidden="true"></i>
//                 </span>
//                 <DatePicker
//                   className="form-control"
//                   name="end_date"
//                   closeOnScroll={(e) => e.target === document}
//                   selected={check ? '' : endDate}
//                   onChange={(date) => setEndDate(date)}
//                   placeholderText="Select"
//                   showYearDropdown
//                   disabled={check}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6"></div>
//           <div className="col-lg-6">
//             <div className="form-group">
//               <div>
//                 <label className="custom-check-container">
//                   I currently work here
//                   <input type="checkbox" onChange={handleCheck} />
//                   <span className="checkmark"></span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row mt-5">
//           <div className="col-sm-6 col-6">
//             <Link to="/expr" className="btn site-btn border-btn">
//               Back
//             </Link>
//           </div>
//           <div className="col-sm-6 col-6 text-right">
//             {/* <Link
//               to=""
//               className="btn site-btn bg-blue text-white"
//               data-toggle="modal"
//               data-target="#moreinfoModal"
//             > */}
//             {/* <span onClick={() => setModalOpen(!modalOpen)}> */}
//             {/* <Link to="/work-Summary"> */}
//             <button
//               type="button"
//               className="btn site-btn bg-blue text-white"
//               data-toggle="modal"
//               data-target="#moreinfoModal"
//               onClick={
//                 () => {
//                   if (defaultValues.jobtitle === '') {
//                     setModalOpen(!modalOpen);
//                     return;
//                   }
//                   if (jobObjectIndex || jobObjectIndex === 'null') {
//                     editJob(jobObjectIndex);
//                     router('/work-Summary');
//                   } else {
//                     saveWorkExpr();
//                     router('/work-Summary');
//                   }
//                 }
//                 // meta_value ? '' : setModalOpen(!modalOpen)
//               }
//             >
//               {' '}
//               NEXT
//             </button>
//             {/* </span> */}
//             {/* </Link> */}
//           </div>
//         </div>

//         {/* more info modal */}

//         <Modal
//           toggle={() => setModalOpen(!modalOpen)}
//           isOpen={modalOpen}
//           className="modal-dialog more-info-modal"
//         >
//           <div className="modal-content ">
//             <div className="modal-header">
//               <button
//                 className="close"
//                 onClick={() => {
//                   setModalOpen(!modalOpen);
//                 }}
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-sm-12">
//                   <h2 className="modal-title h4 mb-3">
//                     More Information Needed
//                   </h2>
//                   <p className="p mb-0">
//                     Looks like you haven't entered any past work experience. We
//                     recommend that you at least enter your past <b>Position</b>{' '}
//                     and <b>Company</b>.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="custom-modal-footer">
//               <div className="row">
//                 <div className="col-sm-8 pd-0">
//                   <Link
//                     to="/skill"
//                     className="d-block btn site-btn border-btn text-inherit"
//                     onClick={() => {
//                       setModalOpen(!modalOpen);
//                     }}
//                   >
//                     I don't have work experience
//                   </Link>
//                 </div>
//                 <div className="col-sm-4  pd-0">
//                   <Link
//                     to="/Work-summary"
//                     className="d-block btn site-btn bg-blue text-white"
//                     onClick={() => {
//                       setModalOpen(!modalOpen);
//                     }}
//                   >
//                     OK
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </form>
//     </>
//   );
// };

// export default WorkHistoryForm;
