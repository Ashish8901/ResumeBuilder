import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import Slider from "react-slick";
import { changeTemplateId } from "../redux/features/resumeSlice";
import TemplateFourStruSlider from "../view/AllTemplate/TemplateFourStruSlider";
import TemplateThreeStruSlider from "../view/AllTemplate/TemplateThreeStruSlider";
const ResumeSlider = () => {
  // eslint-disable-next-line
  const settings = {
    // className: 'center',
    // centerMode: true,
    centerPadding: "60px",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    loop: true,
    controls: false,
    responsive: [
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();

  const handleClick = (id, type) => {
    localStorage.setItem("templiD", id);
    dispatch(changeTemplateId(type));
  };
  const [isActive, setActive] = useState("");
  return (
    <>
      <div>
        {/* <Slider {...settings}> */}
        <div>
          <div
            className={` ${
              isActive === "1"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("1");
            }}
            onMouseEnter={() => {
              setActive("1");
            }}
          >
            <div
              className="resume-zoom styleTempDBTwelve"
              onClick={() => handleClick(12, "styleTempDBTwelve")}
              onMouseEnter={() => handleClick(12, "styleTempDBTwelve")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "2"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("2");
            }}
            onMouseEnter={() => {
              setActive("2");
            }}
          >
            <div
              className="resume-zoom styleTempDBTen"
              onClick={() => handleClick(10, "styleTempDBTen")}
              onMouseEnter={() => handleClick(10, "styleTempDBTen")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "3"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("3");
            }}
            onMouseEnter={() => {
              setActive("3");
            }}
          >
            <div
              className="resume-zoom styleTempDBEleven"
              onClick={() => handleClick(11, "styleTempDBEleven")}
              onMouseEnter={() => handleClick(11, "styleTempDBEleven")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "4"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("4");
            }}
            onMouseEnter={() => {
              setActive("4");
            }}
          >
            <div
              className="resume-zoom styleTempDBNine"
              onClick={() => handleClick(9, "styleTempDBNine")}
              onMouseEnter={() => handleClick(9, "styleTempDBNine")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "5"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("5");
            }}
            onMouseEnter={() => {
              setActive("5");
            }}
          >
            <div
              className="resume-zoom styleTempDBEight"
              onClick={() => handleClick(8, "styleTempDBEight")}
              onMouseEnter={() => handleClick(8, "styleTempDBEight")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "6"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("6");
            }}
            onMouseEnter={() => {
              setActive("6");
            }}
          >
            <div
              className="resume-zoom styleTempDBSix"
              onClick={() => handleClick(4, "styleTempDBSix")}
              onMouseEnter={() => handleClick(4, "styleTempDBSix")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "7"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("7");
            }}
            onMouseEnter={() => {
              setActive("7");
            }}
          >
            <div
              className="resume-zoom styleTempDBSeven"
              onClick={() => handleClick(7, "styleTempDBSeven")}
              onMouseEnter={() => handleClick(7, "styleTempDBSeven")}
            >
              <TemplateFourStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "8"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("8");
            }}
            onMouseEnter={() => {
              setActive("8");
            }}
          >
            <div
              className="resume-zoom styleTempOne"
              onClick={() => handleClick(1, "styleTempOne")}
              onMouseEnter={() => handleClick(1, "styleTempOne")}
            >
              <TemplateThreeStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "9"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("9");
            }}
            onMouseEnter={() => {
              setActive("9");
            }}
          >
            <div
              className="resume-zoom styleTempTwo"
              onClick={() => handleClick(2, "styleTempTwo")}
              onMouseEnter={() => handleClick(2, "styleTempTwo")}
            >
              <TemplateThreeStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "10"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("10");
            }}
            onMouseEnter={() => {
              setActive("10");
            }}
          >
            <div
              className="resume-zoom styleTempThree"
              onClick={() => handleClick(5, "styleTempThree")}
              onMouseEnter={() => handleClick(5, "styleTempThree")}
            >
              <TemplateThreeStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "11"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("11");
            }}
            onMouseEnter={() => {
              setActive("11");
            }}
          >
            <div
              className="resume-zoom styleTempFour"
              onClick={() => handleClick(6, "styleTempFour")}
              onMouseEnter={() => handleClick(6, "styleTempFour")}
            >
              <TemplateThreeStruSlider />
            </div>
          </div>
        </div>
        <div>
          <div
            className={` ${
              isActive === "12"
                ? "active-slide-resume resume-preview"
                : "resume-preview"
            }`}
            onClick={() => {
              setActive("12");
            }}
            onMouseEnter={() => {
              setActive("12");
            }}
          >
            <div
              className="resume-zoom styleTempFive"
              onClick={() => handleClick(7, "styleTempFive")}
              onMouseEnter={() => handleClick(7, "styleTempFive")}
            >
              <TemplateThreeStruSlider />
            </div>
          </div>
        </div>

        {/* </Slider> */}
      </div>
    </>
  );
};

export default ResumeSlider;
