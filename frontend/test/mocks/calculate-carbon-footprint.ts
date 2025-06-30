import { CALCULATE_CARBON_FOOTPRINT } from "@/hooks/useData";
import type { RequestVariables } from "@/types/calculate-carbon-footprint-request-variables";

export const CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST = {
  request: {
    query: CALCULATE_CARBON_FOOTPRINT,
  },
  variableMatcher: (variables: RequestVariables) => {
    return variables.housing?.zipCode === "4";
  },
  result: {
    data: {
      calculateCarbonFootprint: {
        housingEmissionsLbsCO2ePerYear: 5000,
        travelEmissionsLbsCO2ePerYear: 1000,
        totalEmissionsLbsCO2ePerYear: 6000,
        usAverageHouseholdLbsCO2ePerYear: 7000,
      },
    },
  },
};
