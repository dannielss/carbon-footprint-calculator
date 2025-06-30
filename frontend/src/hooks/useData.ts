import type { EmissionsSummary } from "@/types/emission-summary";
import type { FormData } from "@/types/form-data";
import { gql, useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";

export const CALCULATE_CARBON_FOOTPRINT = gql`
  query CalculateCarbonFootprint(
    $housing: HousingInput!
    $travel: TravelInput
  ) {
    calculateCarbonFootprint(housing: $housing, travel: $travel) {
      housingEmissionsLbsCO2ePerYear
      totalEmissionsLbsCO2ePerYear
      travelEmissionsLbsCO2ePerYear
      usAverageHouseholdLbsCO2ePerYear
    }
  }
`;

const useData = (formData: FormData, start: boolean) => {
  const [fetchCarbonFootprint, { error, data }] =
    useLazyQuery<EmissionsSummary>(CALCULATE_CARBON_FOOTPRINT);

  const debouncedFetch = useCallback(
    debounce((variables) => {
      fetchCarbonFootprint({ variables });
    }, 500),
    []
  );

  useEffect(() => {
    if (formData.zipCode && formData.householdSize > 0) {
      const parseNumberFields = (obj: Record<string, string>) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            parseFloat(value) || 0,
          ])
        );

      if (start) {
        debouncedFetch({
          housing: {
            zipCode: formData.zipCode,
            householdSize: formData.householdSize,
            ...parseNumberFields(formData.housing),
          },
          travel: parseNumberFields(formData.travel),
        });
      }
    }
  }, [formData, start, debouncedFetch]);

  return {
    data,
    error,
  };
};

export default useData;
