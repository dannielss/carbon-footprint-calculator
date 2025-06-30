import { DEFAULT_FORM } from "@/constants";
import type { FormData } from "@/types/formData";
import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);

  const updateHousingData = (
    field: keyof FormData["housing"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      housing: {
        ...prev.housing,
        [field]: value,
      },
    }));
  };

  const updateTravelData = (field: keyof FormData["travel"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      travel: {
        ...prev.travel,
        [field]: value,
      },
    }));
  };

  const handleClearForm = () => {
    setFormData(DEFAULT_FORM);
  };

  return {
    formData,
    setFormData,
    updateHousingData,
    updateTravelData,
    handleClearForm,
  };
};

export default useForm;
