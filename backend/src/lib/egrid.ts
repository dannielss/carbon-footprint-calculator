import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { HOUSING_FACTORS } from "@/constants";

const CSV_PATH = path.resolve(__dirname, "../static/egrid3.csv");

type EgridEntry = {
  zip: string;
  emissionRateLbPerMWh: number;
};

const zipToEmission: Record<string, number> = {};

export function loadEgridData() {
  const content = fs.readFileSync(CSV_PATH, "utf8");
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];

  for (const record of records) {
    const entry: EgridEntry = {
      zip: record["Zip"],
      emissionRateLbPerMWh: parseFloat(
        record["Subregion annual CO2e output emission rate (lb/MWh)"]
      ),
    };

    if (entry.zip && !isNaN(entry.emissionRateLbPerMWh)) {
      const emissionKgPerKWh = (entry.emissionRateLbPerMWh * 0.453592) / 1000;
      zipToEmission[entry.zip] = emissionKgPerKWh;
    }
  }
}

export function getElectricityFactorForZip(zipCode: string): number {
  return zipToEmission[zipCode] ?? HOUSING_FACTORS.electricity;
}
