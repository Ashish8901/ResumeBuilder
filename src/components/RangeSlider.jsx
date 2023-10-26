import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Slider from "@material-ui/core/Slider";
import { useTranslation } from "react-i18next";
const RangeSlider = (props) => {
  const { t } = useTranslation();
  // const useStyles = makeStyles({
  //   root: {
  //     width: 500,
  //   },
  // });

  const marks = [
    {
      value: 0,
      label: (
        <span className="range-text">
          <span className="label-name">{t("Beginners")}</span>{" "}
          <span className="label-value">A1</span>
        </span>
      ),
    },
    {
      value: 20,
      label: (
        <span className="range-text">
          <span className="label-name">{t("Basics")}</span>{" "}
          <span className="label-value">A2</span>
        </span>
      ),
    },
    {
      value: 40,
      label: (
        <span className="range-text">
          <span className="label-name">{t("Average knowledge")}</span>{" "}
          <span className="label-value">B1</span>
        </span>
      ),
    },
    {
      value: 60,
      label: (
        <span className="range-text">
          <span className="label-name">
            {t("Upper")} <br /> {t("Good knowledge")}
          </span>
          <span className="label-value">B2</span>
        </span>
      ),
    },
    {
      value: 80,
      label: (
        <span className="range-text">
          <span className="label-name">{t("Advanced knowledge")}</span>{" "}
          <span className="label-value">C1</span>
        </span>
      ),
    },
    {
      value: 100,
      label: (
        <span className="range-text">
          <span className="label-name">{t("Expert")}</span>{" "}
          <span className="label-value">C2</span>
        </span>
      ),
    },
  ];
  const [
    // eslint-disable-next-line
    value,
    setValue,
  ] = React.useState(0);
  const handleChange = (event, Val) => {
    setValue(Val);
    props.onChange(Val);
  };

  // const classes = useStyles();
  // let languageField= JSON.parse(localStorage.getItem("Languagefield"))
  // console.log("languageField",languageField)
  return (
    <>
      <div className="lang-range-slider">
        <Slider
          defaultValue={0}
          step={20}
          min={0}
          max={100}
          marks={marks}
          value={props.data2}
          disabled={props.data ? false : true}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default RangeSlider;
