import { HousingInput, TravelInput } from "@/domain/models";
import { ICalculateCarbonFootprintUseCase } from "@/domain/usecases/calculate-carbon-footprint";
import { ElectricityFactorRepository } from "@/repositories/electricity-factor-repository";
import { CalculateCarbonFootprintUseCase } from "@/usecases/calculate-carbon-footprint";

describe("CalculateCarbonFootprint Use Case", () => {
  let useCase: ICalculateCarbonFootprintUseCase;

  beforeEach(() => {
    const repository = new ElectricityFactorRepository();
    useCase = new CalculateCarbonFootprintUseCase(repository);
  });

  it("should calculates emissions for full housing and travel inputs", async () => {
    const housing: HousingInput = {
      zipCode: "94114",
      householdSize: 3,
      electricityKWhPerMonth: 500,
      naturalGasThermsPerMonth: 30,
      fuelOilGallonsPerMonth: 10,
      lpgGallonsPerMonth: 5,
      wasteLbsPerMonth: 50,
      waterGallonsPerMonth: 100,
    };

    const travel: TravelInput = {
      vehicleMilesPerMonth: 1000,
      busMilesPerMonth: 200,
      metroMilesPerMonth: 150,
      taxiMilesPerMonth: 50,
      railMilesPerMonth: 100,
      flyingMilesPerMonth: 500,
    };

    const result = await useCase.execute({ housing, travel });

    expect(result.housingEmissionsLbsCO2ePerYear).toBeGreaterThan(0);
    expect(result.travelEmissionsLbsCO2ePerYear).toBeGreaterThan(0);
    expect(result.totalEmissionsLbsCO2ePerYear).toBeGreaterThan(0);
    expect(result.usAverageHouseholdLbsCO2ePerYear).toBeCloseTo(
      16000 * 3 * 2.20462,
      0
    );
    expect(result.totalEmissionsLbsCO2ePerYear).toBeCloseTo(
      result.housingEmissionsLbsCO2ePerYear +
        result.travelEmissionsLbsCO2ePerYear,
      2
    );
  });

  it("should calculates emissions when travel is undefined", async () => {
    const housing: HousingInput = {
      zipCode: "94114",
      householdSize: 1,
      electricityKWhPerMonth: 400,
      naturalGasThermsPerMonth: 20,
      fuelOilGallonsPerMonth: 0,
      lpgGallonsPerMonth: 0,
      wasteLbsPerMonth: 30,
      waterGallonsPerMonth: 50,
    };

    const result = await useCase.execute({ housing });

    expect(result.housingEmissionsLbsCO2ePerYear).toBeGreaterThan(0);
    expect(result.travelEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.totalEmissionsLbsCO2ePerYear).toBe(
      result.housingEmissionsLbsCO2ePerYear
    );
    expect(result.usAverageHouseholdLbsCO2ePerYear).toBe(35273.92);
  });

  it("should returns zero emissions when all inputs are zero or missing", async () => {
    const housing: HousingInput = {
      zipCode: "00000",
      householdSize: 0,
      electricityKWhPerMonth: 0,
      naturalGasThermsPerMonth: 0,
      fuelOilGallonsPerMonth: 0,
      lpgGallonsPerMonth: 0,
      wasteLbsPerMonth: 0,
      waterGallonsPerMonth: 0,
    };

    const travel: TravelInput = {};

    const result = await useCase.execute({ housing, travel });

    expect(result.housingEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.travelEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.totalEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.usAverageHouseholdLbsCO2ePerYear).toBe(0);
  });

  it("should returns zero emissions when all travel inputs are zero or missing", async () => {
    const housing: HousingInput = {
      zipCode: "00000",
      householdSize: 0,
    };

    const travel: TravelInput = {
      busMilesPerMonth: 0,
      flyingMilesPerMonth: 0,
      metroMilesPerMonth: 0,
      railMilesPerMonth: 0,
      taxiMilesPerMonth: 0,
      vehicleMilesPerMonth: 0,
    };

    const result = await useCase.execute({ housing, travel });

    expect(result.housingEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.travelEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.totalEmissionsLbsCO2ePerYear).toBe(0);
    expect(result.usAverageHouseholdLbsCO2ePerYear).toBe(0);
  });
});
