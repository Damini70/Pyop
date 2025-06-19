import React from "react";
import StepperForm from "../../../../components/Stepper";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { User, Briefcase } from "lucide-react";

export default function CreateParty() {
  const steps = [
    {
      id: 1,
      title: "Basic Party Info",
      description: "Tell us about your basic party information",
      icon: User,
      component: ({ userData, updateUserData }) => (
        <Step1Form userData={userData} updateUserData={updateUserData} />
      ),
    },
    {
      id: 2,
      title: "Customization and Services",
      description: "Your Customization",
      icon: Briefcase,
      component: ({ userData, updateUserData }) => (
        <Step2Form userData={userData} updateUserData={updateUserData} />
      ),
    },
  ];

  return (
    <div>
      <StepperForm steps={steps} />
    </div>
  );
}
