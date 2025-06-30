"use client";

import type React from "react";

import { useState } from "react";
import type { FormData } from "./types/formData";
import FirstStep from "./components/firstStep";
import SecondStep from "./components/secondStep";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    zipCode: "",
    householdSize: 1,
    housing: {
      electricityKWhPerMonth: 0,
      fuelOilGallonsPerMonth: 0,
      lpgGallonsPerMonth: 0,
      naturalGasThermsPerMonth: 0,
      wasteLbsPerMonth: 0,
      waterGallonsPerMonth: 0,
    },
    travel: {
      busMilesPerMonth: 0,
      flyingMilesPerMonth: 0,
      metroMilesPerMonth: 0,
      railMilesPerMonth: 0,
      taxiMilesPerMonth: 0,
      vehicleMilesPerMonth: 0,
    },
  });

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.zipCode && formData.householdSize > 0) {
      setStep(2);
    }
  };

  const updateHousingData = (
    field: keyof FormData["housing"],
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      housing: {
        ...prev.housing,
        [field]: value,
      },
    }));
  };

  const updateTravelData = (field: keyof FormData["travel"], value: number) => {
    setFormData((prev) => ({
      ...prev,
      travel: {
        ...prev.travel,
        [field]: value,
      },
    }));
  };

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
      updateHousingData={updateHousingData}
      updateTravelData={updateTravelData}
    />
  );
}
