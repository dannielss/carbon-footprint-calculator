import { CALCULATE_CARBON_FOOTPRINT } from "@/hooks/useData";

export const CALCULATE_CARBON_FOOTPRINT_WITH_RETRY_MOCK_REQUEST = {
  request: {
    query: CALCULATE_CARBON_FOOTPRINT,
  },
  variableMatcher: () => {
    return true;
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
