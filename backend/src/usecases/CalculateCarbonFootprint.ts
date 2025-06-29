import {
  HousingInput,
  TravelInput,
  CarbonEmissionResult,
} from "@/domain/models";
import {
  HOUSING_FACTORS,
  TRAVEL_FACTORS,
  US_AVERAGE_PER_PERSON,
  FLYING_RADIATIVE_FORCING,
} from "@/constants";

import {
  toKgFromLbs,
  toLitresFromGallons,
  toKmFromMiles,
  toLbsRounded,
  safeValue,
} from "@/lib/utils";
import { CalculateCarbonFootprintUseCase } from "@/domain/usecases";
import { TravelMode } from "@/types";

export interface CalculateCarbonFootprintInput {
  housing: HousingInput;
  travel?: TravelInput;
}

export class CalculateCarbonFootprint
  implements CalculateCarbonFootprintUseCase
{
  private readonly housingFactors = HOUSING_FACTORS;
  private readonly travelFactors = TRAVEL_FACTORS;
  private readonly US_AVERAGE_PER_PERSON = US_AVERAGE_PER_PERSON;
  private readonly FLYING_RADIATIVE_FORCING = FLYING_RADIATIVE_FORCING;
  private readonly MONTHS_IN_YEAR = 12;
  private readonly MILES_SUFFIX = "MilesPerMonth";

  async execute(
    input: Readonly<CalculateCarbonFootprintInput>
  ): Promise<CarbonEmissionResult> {
    const { housing, travel } = input;

    const usAverageForHousehold =
      this.US_AVERAGE_PER_PERSON * housing.householdSize;

    const housingEmissions = this.calculateHousingEmissions(housing);
    const travelEmissions = this.calculateTravelEmissions(travel);
    const totalEmissions = housingEmissions + travelEmissions;

    return {
      housingEmissionsLbsCO2ePerYear: toLbsRounded(
        housingEmissions * this.MONTHS_IN_YEAR
      ),
      travelEmissionsLbsCO2ePerYear: toLbsRounded(
        travelEmissions * this.MONTHS_IN_YEAR
      ),
      totalEmissionsLbsCO2ePerYear: toLbsRounded(
        totalEmissions * this.MONTHS_IN_YEAR
      ),
      usAverageHouseholdLbsCO2ePerYear: toLbsRounded(usAverageForHousehold),
    };
  }

  private calculateHousingEmissions(housing: HousingInput): number {
    const electricity =
      safeValue(housing.electricityKWhPerMonth) *
      this.housingFactors.electricity;

    const naturalGas =
      safeValue(housing.naturalGasThermsPerMonth) *
      this.housingFactors.naturalGas;

    const fuelOil =
      toLitresFromGallons(safeValue(housing.fuelOilGallonsPerMonth)) *
      this.housingFactors.fuelOil;

    const lpg =
      toLitresFromGallons(safeValue(housing.lpgGallonsPerMonth)) *
      this.housingFactors.lpg;

    const wasteKg = toKgFromLbs(safeValue(housing.wasteLbsPerMonth));
    const waste = wasteKg * this.housingFactors.waste;

    const water =
      toLitresFromGallons(safeValue(housing.waterGallonsPerMonth)) *
      this.housingFactors.water;

    return electricity + naturalGas + fuelOil + lpg + waste + water;
  }

  private calculateTravelEmissions(travel?: TravelInput): number {
    if (!travel) return 0;

    let total = 0;

    for (const [inputProp, milesPerMonth] of Object.entries(travel) as [
      keyof TravelInput,
      number
    ][]) {
      if (!safeValue(milesPerMonth)) continue;

      const key = inputProp.replace(this.MILES_SUFFIX, "") as TravelMode;

      let emission =
        toKmFromMiles(safeValue(milesPerMonth)) * this.travelFactors[key];

      if (key === "flying") {
        emission *= this.FLYING_RADIATIVE_FORCING;
      }

      total += emission;
    }

    return total;
  }
}
