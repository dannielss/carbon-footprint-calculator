import {
  CalculateCarbonFootprint,
  CalculateCarbonFootprintInput,
} from "src/usecases";

const calculateCarbonFootprintUseCase = new CalculateCarbonFootprint();

export const resolvers = {
  Query: {
    calculateCarbonFootprint: async (
      _parent: any,
      args: CalculateCarbonFootprintInput
    ) => {
      const { housing, travel } = args;
      const result = await calculateCarbonFootprintUseCase.execute({
        housing,
        travel,
      });
      return result;
    },
  },
};
