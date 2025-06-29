import { CarbonEmissionResult } from "../models/CarbonEmissionResult";
import { HousingInput } from "../models/HousingInput";
import { TravelInput } from "../models/TravelInput";

export interface CalculateCarbonFootprintUseCase {
  execute(input: {
    housing: HousingInput;
    travel: TravelInput;
  }): Promise<CarbonEmissionResult>;
}
