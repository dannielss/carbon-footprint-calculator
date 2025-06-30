import { TravelMode } from "../types";

export const HOUSING_FACTORS = {
  naturalGas: 5.3, // kg CO2e per therm
  fuelOil: 2.68, // kg CO2e per litre
  lpg: 3.19, // kg CO2e per litre
  waste: 0.43, // kg CO2e per kg
  water: 0.000298, // kg CO2e per litr
  electricity: 0.453, // kg CO2e per kWh
};

export const TRAVEL_FACTORS: Record<TravelMode, number> = {
  vehicle: 0.404, // kg CO2e per mile
  bus: 0.105, // kg CO2e per mile
  metro: 0.09, // kg CO2e per mile
  taxi: 0.404, // kg CO2e per mile
  rail: 0.041, // kg CO2e per mile
  flying: 0.24, // kg CO2e per mile
};

export const UNIT_CONVERSIONS = {
  LITRES_PER_GALLON: 3.78541,
  MILES_TO_KM: 1.60934,
  POUNDS_TO_KG: 0.453592,
};

export const US_AVERAGE_PER_PERSON = 16000; // annual kg CO2e per person
export const FLYING_RADIATIVE_FORCING = 1.9; // Multiplier for aviation impact
export const KG_TO_LBS = 2.20462;
