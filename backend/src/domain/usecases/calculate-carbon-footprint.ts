import { CarbonEmissionResult } from "../models/carbon-emission-result";
import { HousingInput } from "../models/housing-input";
import { TravelInput } from "../models/travel-input";

export interface ICalculateCarbonFootprintUseCase {
  execute(input: {
    housing: HousingInput;
    travel?: TravelInput;
  }): Promise<CarbonEmissionResult>;
}
