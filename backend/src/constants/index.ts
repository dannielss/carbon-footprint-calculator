import { TravelMode } from "../types";

export const HOUSING_FACTORS = {
  naturalGas: 5.3, // kg CO2e per therm
  fuelOil: 10.21, // kg CO2e per litre
  lpg: 5.74, // kg CO2e per litre
  waste: 0.43, // kg CO2e per kg
  water: 0.000298, // kg CO2e per litre
  electricity: 0.453, // kg CO2e per kWh
};

export const TRAVEL_FACTORS: Record<TravelMode, number> = {
  vehicle: 0.192,
  bus: 0.105,
  metro: 0.09,
  taxi: 0.23,
  rail: 0.041,
  flying: 0.158,
};

export const UNIT_CONVERSIONS = {
  LITRES_PER_GALLON: 3.78541,
  MILES_TO_KM: 1.60934,
  POUNDS_TO_KG: 0.453592,
};

export const US_AVERAGE_PER_PERSON = 16000; // annual kg CO2e per person
export const FLYING_RADIATIVE_FORCING = 1.09;
export const KG_TO_LBS = 2.20462;
