export interface HousingInput {
  electricityKWhPerMonth?: number;
  naturalGasThermsPerMonth?: number;
  fuelOilGallonsPerMonth?: number;
  lpgGallonsPerMonth?: number;
  wasteLbsPerMonth?: number;
  waterGallonsPerMonth?: number;

  zipCode: string;
  householdSize: number;
}
