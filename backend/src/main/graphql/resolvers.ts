import type {
  CalculateCarbonFootprintInput,
  CarbonEmissionResult,
} from "@/domain/models";
import type { UseCases } from "@/domain/usecases";

export class Resolvers {
  constructor(private useCases: UseCases) {}

  public get resolvers() {
    return {
      Query: {
        calculateCarbonFootprint: async (
          _parent: any,
          args: CalculateCarbonFootprintInput
        ): Promise<CarbonEmissionResult> => {
          const { housing, travel } = args;
          const result = await this.useCases.calculateCarbonFootprint.execute({
            housing,
            travel,
          });
          return result;
        },
      },
    };
  }
}
