export interface IElectricityFactorRepository {
  getElectricityFactorForZip(zipCode: string): number;
}
