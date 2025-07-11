export interface EmissionsSummary {
  calculateCarbonFootprint: {
    housingEmissionsLbsCO2ePerYear: number;
    travelEmissionsLbsCO2ePerYear: number;
    totalEmissionsLbsCO2ePerYear: number;
    usAverageHouseholdLbsCO2ePerYear: number;
  };
}
