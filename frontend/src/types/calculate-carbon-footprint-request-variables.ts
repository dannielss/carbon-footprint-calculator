export interface RequestVariables {
  housing: {
    zipCode: string;
    householdSize: number;
    electricityKWhPerMonth: string;
    fuelOilGallonsPerMonth: string;
    lpgGallonsPerMonth: string;
    naturalGasThermsPerMonth: string;
    wasteLbsPerMonth: string;
    waterGallonsPerMonth: string;
  };
  travel?: {
    busMilesPerMonth: string;
    flyingMilesPerMonth: string;
    metroMilesPerMonth: string;
    railMilesPerMonth: string;
    taxiMilesPerMonth: string;
    vehicleMilesPerMonth: string;
  };
}
