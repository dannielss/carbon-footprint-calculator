import { KG_TO_LBS, UNIT_CONVERSIONS } from "@/constants";

export const toKgFromLbs = (valueLbs: number): number => {
  return valueLbs * UNIT_CONVERSIONS.POUNDS_TO_KG;
};

export const toLitresFromGallons = (valueGallons: number): number => {
  return valueGallons * UNIT_CONVERSIONS.LITRES_PER_GALLON;
};

export const toKmFromMiles = (valueMiles: number): number => {
  return valueMiles * UNIT_CONVERSIONS.MILES_TO_KM;
};

export const toLbsRounded = (kg: number): number => {
  return Number((kg * KG_TO_LBS).toFixed(2));
};

export const safeValue = (value?: number): number => {
  return Math.max(0, value ?? 0);
};
