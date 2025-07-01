import { getElectricityFactorForZip } from "@/lib/egrid";
import { IElectricityFactorRepository } from "@/domain/repositories/electricity-factor-repository";

export class ElectricityFactorRepository
  implements IElectricityFactorRepository
{
  getElectricityFactorForZip(zipCode: string): number {
    return getElectricityFactorForZip(zipCode);
  }
}
