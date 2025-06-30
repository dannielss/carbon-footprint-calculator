import { Home, Car, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FormData } from "@/types/form-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import type { EmissionsSummary } from "@/types/emission-summary";
import { useSummary } from "@/hooks";

interface SecondStepProps {
  formData: FormData;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  updateHousingData: (field: keyof FormData["housing"], value: string) => void;
  updateTravelData: (field: keyof FormData["travel"], value: string) => void;
  data: EmissionsSummary | undefined;
  handleClearForm: VoidFunction;
}

const SecondStep: React.FC<SecondStepProps> = ({
  formData,
  setStep,
  setStart,
  updateHousingData,
  updateTravelData,
  data,
  handleClearForm,
}: SecondStepProps) => {
  const { comparisonColor, comparisonLabel } = useSummary(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-700 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Carbon Footprint Calculator</h1>
            <p className="text-blue-100">
              ZIP Code: {formData.zipCode} | Household Size:{" "}
              {formData.householdSize}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              setStart(false);
              handleClearForm();
            }}
            className="text-blue-700 border-white hover:bg-blue-50"
          >
            Back to Start
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="housing" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="housing"
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Housing
                </TabsTrigger>
                <TabsTrigger
                  value="travel"
                  className="flex items-center gap-2"
                  data-testid="travel"
                >
                  <Car className="w-4 h-4" />
                  Travel
                </TabsTrigger>
              </TabsList>

              <TabsContent value="housing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Housing Emissions</CardTitle>
                    <CardDescription>
                      Enter your monthly usage for each category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="electricity">
                          Electricity (kWh per month)
                        </Label>
                        <Input
                          id="electricity"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.housing.electricityKWhPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "electricityKWhPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fuel-oil">
                          Fuel Oil (gallons per month)
                        </Label>
                        <Input
                          id="fuel-oil"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.housing.fuelOilGallonsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "fuelOilGallonsPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lpg">LPG (gallons per month)</Label>
                        <Input
                          id="lpg"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.housing.lpgGallonsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "lpgGallonsPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="natural-gas">
                          Natural Gas (therms per month)
                        </Label>
                        <Input
                          id="natural-gas"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.housing.naturalGasThermsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "naturalGasThermsPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="waste">Waste (lbs per month)</Label>
                        <Input
                          id="waste"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.housing.wasteLbsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "wasteLbsPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="water">Water (gallons per month)</Label>
                        <Input
                          id="water"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.housing.waterGallonsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "waterGallonsPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="travel" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Emissions</CardTitle>
                    <CardDescription>
                      Enter your monthly travel miles for each transportation
                      method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bus">Bus (miles per month)</Label>
                        <Input
                          id="bus"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.travel.busMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData("busMilesPerMonth", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="flying">Flying (miles per month)</Label>
                        <Input
                          id="flying"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.travel.flyingMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "flyingMilesPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metro">Metro (miles per month)</Label>
                        <Input
                          id="metro"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.travel.metroMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "metroMilesPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rail">Rail (miles per month)</Label>
                        <Input
                          id="rail"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.travel.railMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "railMilesPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxi">Taxi (miles per month)</Label>
                        <Input
                          id="taxi"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.travel.taxiMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "taxiMilesPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle">
                          Personal Vehicle (miles per month)
                        </Label>
                        <Input
                          id="vehicle"
                          type="string"
                          min="0"
                          step="0.1"
                          value={formData.travel.vehicleMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "vehicleMilesPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Emissions Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Housing Emissions
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      {
                        data?.calculateCarbonFootprint
                          .housingEmissionsLbsCO2ePerYear
                      }{" "}
                      lbs CO₂e/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Travel Emissions
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      {
                        data?.calculateCarbonFootprint
                          .travelEmissionsLbsCO2ePerYear
                      }{" "}
                      lbs CO₂e/year
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Emissions</span>
                    <span className="font-bold text-lg text-blue-600">
                      {
                        data?.calculateCarbonFootprint
                          .totalEmissionsLbsCO2ePerYear
                      }{" "}
                      lbs CO₂e/year
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      US Average Household
                    </span>
                    <span className="text-xs text-gray-600">
                      {
                        data?.calculateCarbonFootprint
                          .usAverageHouseholdLbsCO2ePerYear
                      }{" "}
                      lbs CO₂e/year
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    * for a household of {formData.householdSize} people in Zip
                    Code {formData.zipCode}
                  </span>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">
                      Comparison to US Average
                    </div>
                    <div className={`text-sm font-medium ${comparisonColor}`}>
                      {comparisonLabel}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
