import { HousingInput, TravelInput } from "./index";

export interface CalculateCarbonFootprintInput {
  housing: HousingInput;
  travel?: TravelInput;
}
