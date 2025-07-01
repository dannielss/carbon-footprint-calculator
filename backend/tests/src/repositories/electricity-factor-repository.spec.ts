import { ElectricityFactorRepository } from "@/repositories/electricity-factor-repository";
import { loadEgridData, getElectricityFactorForZip } from "@/lib/egrid";
import { HOUSING_FACTORS } from "@/constants";

describe("ElectricityFactorRepository (integration)", () => {
  beforeAll(() => {
    loadEgridData();
  });

  it("returns the correct emission factor for a known ZIP code", () => {
    const zip = "30301";
    const expected = getElectricityFactorForZip(zip);

    const repo = new ElectricityFactorRepository();
    const result = repo.getElectricityFactorForZip(zip);

    expect(result).toBe(expected);
  });

  it("falls back to default factor when ZIP code is not found", () => {
    const unknownZip = "99999";
    const repo = new ElectricityFactorRepository();
    const result = repo.getElectricityFactorForZip(unknownZip);

    expect(result).toBe(HOUSING_FACTORS.electricity);
  });
});
