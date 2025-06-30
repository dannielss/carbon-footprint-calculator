import { CALCULATE_CARBON_FOOTPRINT } from "@/hooks/useData";
import type { RequestVariables } from "@/types/calculate-carbon-footprint-request-variables";

export const CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST_WITH_ERROR = {
  request: {
    query: CALCULATE_CARBON_FOOTPRINT,
  },
  variableMatcher: (variables: RequestVariables) => {
    return variables.housing?.zipCode === "2";
  },
  error: new Error("Network error"),
};
