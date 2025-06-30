import fs from "fs";
import { loadEgridData, getElectricityFactorForZip } from "@/lib/egrid";
import { HOUSING_FACTORS } from "@/constants";

jest.mock("fs");

const MOCK_CSV = `Zip,state,Primary eGRID Subregion,Subregion annual CO2e output emission rate (lb/MWh)
10001,NY,NYCW,500
90210,CA,CAMX,700
30301,GA,SRSO,450
10000,GA,SRSO,Invalid
`;

describe("eGRID loader", () => {
  beforeEach(() => {
    jest.resetModules();
    (fs.readFileSync as jest.Mock).mockReturnValue(MOCK_CSV);
    loadEgridData();
  });

  it("should load emission factors correctly from CSV", () => {
    const factorNY = getElectricityFactorForZip("10001");
    const factorCA = getElectricityFactorForZip("90210");
    const factorGA = getElectricityFactorForZip("30301");

    expect(factorNY).toBeCloseTo((500 * 0.453592) / 1000, 6);
    expect(factorCA).toBeCloseTo((700 * 0.453592) / 1000, 6);
    expect(factorGA).toBeCloseTo((450 * 0.453592) / 1000, 6);
  });

  it("should skip invalid records (missing zip or invalid emission rate)", () => {
    const factorToSkip = getElectricityFactorForZip("10000");
    expect(factorToSkip).toBe(HOUSING_FACTORS.electricity);
  });

  it("should fallback to default if zip not found", () => {
    const fallback = getElectricityFactorForZip("99999");
    expect(fallback).toBe(HOUSING_FACTORS.electricity);
  });
});
