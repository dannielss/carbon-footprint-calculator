export interface FormData {
  zipCode: string;
  householdSize: number;
  housing: {
    electricityKWhPerMonth: string;
    fuelOilGallonsPerMonth: string;
    lpgGallonsPerMonth: string;
    naturalGasThermsPerMonth: string;
    wasteLbsPerMonth: string;
    waterGallonsPerMonth: string;
  };
  travel: {
    busMilesPerMonth: string;
    flyingMilesPerMonth: string;
    metroMilesPerMonth: string;
    railMilesPerMonth: string;
    taxiMilesPerMonth: string;
    vehicleMilesPerMonth: string;
  };
}
