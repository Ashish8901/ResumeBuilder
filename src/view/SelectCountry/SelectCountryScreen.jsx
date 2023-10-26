import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageHeading from '../../components/PageHeading';
import PageSubHeading from '../../components/PageSubHeading';
import { useNavigate } from 'react-router-dom';
import { selectCountry } from '../../redux/features/resumeSlice';
const SelectCountryScreen = () => {
  const {t } = useTranslation()
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/choose-template`;

    if (!value) {
      dispatch(selectCountry({ label: 'Germany' }));
    }

    navigate(path);
  };
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setValue(value);
    dispatch(selectCountry(value ? value : 'Germany'));
  };
  return (
    <>
      <section className="exp-screen-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="exp-content-box">
                <div className="exp-content-inner">
                <PageHeading headinglabel={t("Where are you focusing your job search?")} />
                  <PageSubHeading subheading={t("We'll recommend the right templates for your target country.")} />
                </div>
                <div className="select-country-box text-left mt-5">
                <p className="mb-1 f-14">{t('select a country')}</p>
                  <Select
                    options={options}
                    value={value}
                    defaultInputValue="Germany"
                    onChange={changeHandler}
                  />
                </div>
                <div className="mt-5">
                  <button className="custm-btn" onClick={routeChange}>
                  {t('See templates')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectCountryScreen;
