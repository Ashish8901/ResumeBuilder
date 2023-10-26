// import React, { useState, useMemo } from 'react';
// import Select from 'react-select';
// import countryList from 'react-select-country-list';
// import { useDispatch } from 'react-redux';
// import { selectCountry } from '../redux/features/resumeSlice';

// const SelectCountry = () => {
//   const [value, setValue] = useState('');
//   const options = useMemo(() => countryList().getData(), []);
//   const dispatch = useDispatch();

//   const changeHandler = (value) => {
//     setValue(value);
//     dispatch(selectCountry(value ? value : 'India'));
//   };
//   return (
//     <>
//       <p className="mb-1 f-14">select a country</p>
//       <Select
//         options={options}
//         value={value}
//         defaultInputValue="India"
//         onChange={changeHandler}
//       />
//     </>
//   );
// };

// export default SelectCountry;
