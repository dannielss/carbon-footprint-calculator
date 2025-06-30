import type { EmissionsSummary } from "@/types/emissionSummary";

const useSummary = (data: EmissionsSummary | undefined) => {
  const total =
    data?.calculateCarbonFootprint.totalEmissionsLbsCO2ePerYear ?? 0;
  const average =
    data?.calculateCarbonFootprint.usAverageHouseholdLbsCO2ePerYear ?? 1;
  const isAbove = total > average;
  const percentageDiff = Math.round(
    Math.abs((total - average) / average) * 100
  );
  const comparisonColor = isAbove ? "text-red-600" : "text-green-600";
  const comparisonLabel = `${percentageDiff}% ${
    isAbove ? "above" : "below"
  } average`;

  return {
    comparisonColor,
    comparisonLabel,
  };
};

export default useSummary;
