import { CarbonEmissionResult } from "../models/CarbonEmissionResult";
import { HousingInput } from "../models/HousingInput";
import { TravelInput } from "../models/TravelInput";

export interface ICalculateCarbonFootprintUseCase {
  execute(input: {
    housing: HousingInput;
    travel?: TravelInput;
  }): Promise<CarbonEmissionResult>;
}
