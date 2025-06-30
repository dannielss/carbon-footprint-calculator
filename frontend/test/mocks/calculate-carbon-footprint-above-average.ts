import { CALCULATE_CARBON_FOOTPRINT } from "@/hooks/useData";
import type { RequestVariables } from "@/types/calculate-carbon-footprint-request-variables";

export const CALCULATE_CARBON_FOOTPRINT_ABOVE_AVERAGE_MOCK_REQUEST = {
  request: {
    query: CALCULATE_CARBON_FOOTPRINT,
  },
  variableMatcher: (variables: RequestVariables) => {
    return variables.housing?.zipCode === "1";
  },
  result: {
    data: {
      calculateCarbonFootprint: {
        housingEmissionsLbsCO2ePerYear: 8000,
        travelEmissionsLbsCO2ePerYear: 0,
        totalEmissionsLbsCO2ePerYear: 8000,
        usAverageHouseholdLbsCO2ePerYear: 7000,
      },
    },
  },
};
