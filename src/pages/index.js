import React from "react";
import StepScreen from "./StepScreen/index";
import ExpLevel from "./ExpLevel/index";
import SelectCountry from "./SelectCountry/index";
import ChooseTemplate from "./ChooseTemplate/index";
import SelectResume from "./SelectResume/index";
import { Routes, Route } from "react-router-dom";
import SelectresumeStructure from "./ResumeContactForm/index";
import ResumeEduction from "../view/ResumeContactForm/ResumeEduction";
import EductaionDetailForm from "./EducationDetailForm/index";
import EductaionSummary from "./EducationSummary/Index";
import WorkHistorySummary from "./WorkHistorySummary/Index";
import ResumeWorkHistory from "../view/WorkHistory/ResumeWorkHisttory";
import WorkHistory from "../view/WorkHistory/index";
import SkillPreview from "../view/SkillTemplate/SkillPreview";
import SkillTemplate from "./SkillTemplate/index";
import AccomplishTemplate from "./AccomplishTemplate/index";
import AffiliationsTemplate from "./AffiliationsTemplate/index";
import HobbiesTemplates from "./HobbiesTemplate/index";
import AddLanguage from "./AddLanguage/index";
import CertificationTemplate from "./CertificationTemplate/index";
import WebPortfolio from "./WebPortfolio/index";
import SummaryPreview from "../view/SummaryTemplate/SummaryPreview";
import SignaturePreview from "../view/UploadSignature/SignaturePreview";
import SummaryTemplate from "./SummaryTemplate/index";
import ExtraSection from "./ExtraSection/index";
import FinalResume from "./FinalResume/index";
import ResumeTemplateFinal from "../components/ResumeTemplateFinal";
import Customer from "./Customer/index";
import CustomerAccount from "./CustomerAccount/index";
import UpgardeFeature from "./UpgradeFeature/index";
import OrderHistory from "./OrderHistory/index";
import BillHistory from "./BillHistory/index";
import AddDetail from "./AddDetail/index";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import TestStucture from "../view/TestStucture";
import CustomSectionOne from "./CustomSectionOne/index";
import CustomSectionTwo from "./CustomSectionTwo/index";
import AdditionalInfo from "./AdditionalInfo/index";
import SignupLogin from "./SignUpInfo/SignUpLogin";
import EduDescription from "./EducationDescription/index";
import WorkDescription from "./WorkDescription/index";
import Accessbility from "./Accessibility/index";
import UploadSignature from "./UploadSignature/index";
const stripePromise = loadStripe(
  "pk_test_51MedSSHlrRwSiTUq3wT3plEQYccvpS0FfvHDhvb69wqKeqOaZ6M3JmLAWES8yyuvozTt7ORaJvJa3MyIfy35rJmj00fsptUbjC"
);

const index = () => {
  const handleRemoval = (value, str) => {
    let replacedStr = "";

    let replacedNbsp = str.replaceAll(`&nbsp;`, "");
    const newString = replacedNbsp.replaceAll(/\s+/g, " ").trim();

    if (newString.includes(`<p>${value}</p>`)) {
      replacedStr = newString.replace(`<p>${value}</p>`, "");
    }
    if (newString.includes(`<p>${value} </p>`)) {
      replacedStr = newString.replace(`<p>${value} </p>`, "");
    }
    if (newString.includes(`<li>${value}</li>`)) {
      replacedStr = newString.replace(`<li>${value}</li>`, "");
    }
    if (newString.includes(`<li>${value} </li>`)) {
      replacedStr = newString.replace(`<li>${value} </li>`, "");
    }
    if (newString.includes(`<li><strong>${value}</strong></li>`)) {
      replacedStr = newString.replace(`<li><strong>${value}</strong></li>`, "");
    }
    if (newString.includes(`<li><strong>${value} </strong></li>`)) {
      replacedStr = newString.replace(
        `<li><strong>${value} </strong></li>`,
        ""
      );
    }
    if (newString.includes(`<li><i>${value}</i></li>`)) {
      replacedStr = newString.replace(`<li><i>${value}</i></li>`, "");
    }
    if (newString.includes(`<li><i>${value} </i></li>`)) {
      replacedStr = newString.replace(`<li><i>${value} </i></li>`, "");
    }
    if (newString.includes(`<p><i>${value}</i></p>`)) {
      replacedStr = newString.replace(`<p><i>${value}</i></p>`, "");
    }
    if (newString.includes(`<p><i>${value} </i></p>`)) {
      replacedStr = newString.replace(`<li><i>${value} </i></li>`, "");
    }
    if (newString.includes(`<p><strong>${value} </strong></p>`)) {
      replacedStr = newString.replace(`<p><strong>${value} </strong></p>`, "");
    }
    if (newString.includes(`<p><strong>${value}</strong></p>`)) {
      replacedStr = newString.replace(`<p><strong>${value}</strong></p>`, "");
    }
    return replacedStr;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<StepScreen />}></Route>
        <Route path="/experience-level" element={<ExpLevel />}></Route>
        <Route path="/signup-login" element={<SignupLogin />}></Route>
        <Route path="/select-country" element={<SelectCountry />}></Route>
        <Route path="/choose-template" element={<ChooseTemplate />}></Route>
        <Route path="/select-resume" element={<SelectResume />}></Route>
        <Route path="/resume" element={<SelectresumeStructure />}></Route>
        <Route path="/resume-education" element={<ResumeEduction />}></Route>
        <Route
          path="/edu-del"
          element={<EductaionDetailForm handleRemoval={handleRemoval} />}
        ></Route>
        <Route path="/edu-summary" element={<EductaionSummary />}></Route>
        <Route path="/Work-summary" element={<WorkHistorySummary />}></Route>
        <Route path="/expr" element={<ResumeWorkHistory />}></Route>
        <Route path="/work-expr-form" element={<WorkHistory />}></Route>
        <Route path="/skill" element={<SkillPreview />}></Route>
        <Route
          path="/add-skill"
          element={<SkillTemplate handleRemoval={handleRemoval} />}
        ></Route>
        <Route
          path="/accm"
          element={<AccomplishTemplate handleRemoval={handleRemoval} />}
        ></Route>
        <Route
          path="/afil"
          element={<AffiliationsTemplate handleRemoval={handleRemoval} />}
        ></Route>
        <Route
          path="/hobbies"
          element={<HobbiesTemplates handleRemoval={handleRemoval} />}
        ></Route>
        <Route path="/alnk" element={<WebPortfolio />}></Route>
        <Route path="/upload-signature" element={<UploadSignature />}></Route>
        <Route path="/cus-one" element={<CustomSectionOne />}></Route>
        <Route path="/cus-two" element={<CustomSectionTwo />}></Route>
        <Route path="/addi" element={<AdditionalInfo />}></Route>
        <Route
          path="/cert"
          element={<CertificationTemplate handleRemoval={handleRemoval} />}
        ></Route>
        <Route path="/lngg" element={<AddLanguage />}></Route>
        <Route path="/summary" element={<SummaryPreview />}></Route>
        <Route path="/signature" element={<SignaturePreview />}></Route>
        <Route
          path="/add-summary"
          element={<SummaryTemplate handleRemoval={handleRemoval} />}
        ></Route>
        <Route path="/add-section" element={<ExtraSection />}></Route>
        <Route path="/final-resume" element={<FinalResume />}></Route>
        <Route
          path="/final-resume-template"
          element={<ResumeTemplateFinal />}
        ></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/customer-account" element={<CustomerAccount />}></Route>
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <UpgardeFeature />
            </Elements>
          }
        ></Route>
        <Route path="/bill-history" element={<BillHistory />}></Route>
        <Route path="/order-history" element={<OrderHistory />}></Route>
        <Route path="/add-del" element={<AddDetail />}></Route>
        <Route path="/accessibility" element={<Accessbility />}></Route>
        <Route
          exact
          path="/work-description"
          element={<WorkDescription />}
        ></Route>
        <Route
          exact
          path="/edu-description"
          element={<EduDescription />}
        ></Route>
        <Route path="/test-struture" element={<TestStucture />}></Route>
      </Routes>
    </div>
  );
};
export default index;
