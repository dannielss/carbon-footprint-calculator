export interface FormData {
  zipCode: string;
  householdSize: number;
  housing: {
    electricityKWhPerMonth: number;
    fuelOilGallonsPerMonth: number;
    lpgGallonsPerMonth: number;
    naturalGasThermsPerMonth: number;
    wasteLbsPerMonth: number;
    waterGallonsPerMonth: number;
  };
  travel: {
    busMilesPerMonth: number;
    flyingMilesPerMonth: number;
    metroMilesPerMonth: number;
    railMilesPerMonth: number;
    taxiMilesPerMonth: number;
    vehicleMilesPerMonth: number;
  };
}
