"use client";

import type React from "react";

import { useState } from "react";
import { FirstStep, SecondStep } from "./components";
import { useForm } from "./hooks";
import useData from "./hooks/useData";

export default function App() {
  const [step, setStep] = useState(1);
  const [start, setStart] = useState(false);
  const {
    formData,
    setFormData,
    updateHousingData,
    updateTravelData,
    handleClearForm,
  } = useForm();
  const { data, error } = useData(formData, start);

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.zipCode && formData.householdSize > 0) {
      setStep(2);
      setStart(true);
    }
  };

  if (error) {
    return <div>error...</div>;
  }

  if (step === 1) {
    return (
      <FirstStep
        formData={formData}
        handleBasicInfoSubmit={handleBasicInfoSubmit}
        setFormData={setFormData}
      />
    );
  }

  return (
    <SecondStep
      formData={formData}
      setStep={setStep}
      setStart={setStart}
      updateHousingData={updateHousingData}
      updateTravelData={updateTravelData}
      data={data}
      handleClearForm={handleClearForm}
    />
  );
}
