import {
  toKgFromLbs,
  toLitresFromGallons,
  toKmFromMiles,
  toLbsRounded,
  safeValue,
} from "@/lib/utils";

import { UNIT_CONVERSIONS, KG_TO_LBS } from "@/constants";

describe("Unit Conversion Utilities", () => {
  describe("toKgFromLbs", () => {
    it("converts pounds to kilograms", () => {
      expect(toKgFromLbs(10)).toBeCloseTo(10 * UNIT_CONVERSIONS.POUNDS_TO_KG);
    });
  });

  describe("toLitresFromGallons", () => {
    it("converts gallons to litres", () => {
      expect(toLitresFromGallons(5)).toBeCloseTo(
        5 * UNIT_CONVERSIONS.LITRES_PER_GALLON
      );
    });
  });

  describe("toKmFromMiles", () => {
    it("converts miles to kilometers", () => {
      expect(toKmFromMiles(3)).toBeCloseTo(3 * UNIT_CONVERSIONS.MILES_TO_KM);
    });
  });

  describe("toLbsRounded", () => {
    it("converts kilograms to pounds and rounds to 2 decimals", () => {
      const result = toLbsRounded(2.5);
      expect(result).toBeCloseTo(2.5 * KG_TO_LBS);
    });
  });

  describe("safeValue", () => {
    it("returns the value if it's positive", () => {
      expect(safeValue(10)).toBe(10);
    });

    it("returns 0 if the value is undefined", () => {
      expect(safeValue(undefined)).toBe(0);
    });

    it("returns 0 if the value is negative", () => {
      expect(safeValue(-20)).toBe(0);
    });
  });
});
