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
import type { FormData } from "@/types/formData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface SecondStepProps {
  formData: FormData;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  updateHousingData: (field: keyof FormData["housing"], value: number) => void;
  updateTravelData: (field: keyof FormData["travel"], value: number) => void;
}

const SecondStep: React.FC<SecondStepProps> = ({
  formData,
  setStep,
  updateHousingData,
  updateTravelData,
}: SecondStepProps) => {
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
            onClick={() => setStep(1)}
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
                <TabsTrigger value="travel" className="flex items-center gap-2">
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
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.housing.electricityKWhPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "electricityKWhPerMonth",
                              Number.parseFloat(e.target.value) || 0
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
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.housing.fuelOilGallonsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "fuelOilGallonsPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lpg">LPG (gallons per month)</Label>
                        <Input
                          id="lpg"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.housing.lpgGallonsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "lpgGallonsPerMonth",
                              Number.parseFloat(e.target.value) || 0
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
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.housing.naturalGasThermsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "naturalGasThermsPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="waste">Waste (lbs per month)</Label>
                        <Input
                          id="waste"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.housing.wasteLbsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "wasteLbsPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="water">Water (gallons per month)</Label>
                        <Input
                          id="water"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.housing.waterGallonsPerMonth}
                          onChange={(e) =>
                            updateHousingData(
                              "waterGallonsPerMonth",
                              Number.parseFloat(e.target.value) || 0
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
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.travel.busMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "busMilesPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="flying">Flying (miles per month)</Label>
                        <Input
                          id="flying"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.travel.flyingMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "flyingMilesPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metro">Metro (miles per month)</Label>
                        <Input
                          id="metro"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.travel.metroMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "metroMilesPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rail">Rail (miles per month)</Label>
                        <Input
                          id="rail"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.travel.railMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "railMilesPerMonth",
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxi">Taxi (miles per month)</Label>
                        <Input
                          id="taxi"
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.travel.taxiMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "taxiMilesPerMonth",
                              Number.parseFloat(e.target.value) || 0
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
                          type="number"
                          min="0"
                          step="0.1"
                          value={formData.travel.vehicleMilesPerMonth}
                          onChange={(e) =>
                            updateTravelData(
                              "vehicleMilesPerMonth",
                              Number.parseFloat(e.target.value) || 0
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
                      lbs CO₂e/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Travel Emissions
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      lbs CO₂e/year
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Emissions</span>
                    <span className="font-bold text-lg text-blue-600">
                      lbs CO₂e/year
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      US Average Household
                    </span>
                    <span className="text-sm text-gray-600">lbs CO₂e/year</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">
                      Comparison to US Average
                    </div>
                    {/* <div
                      className={`text-sm font-medium ${
                        emissions.totalEmissionsLbsCO2ePerYear >
                        emissions.usAverageHouseholdLbsCO2ePerYear
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {emissions.totalEmissionsLbsCO2ePerYear >
                      emissions.usAverageHouseholdLbsCO2ePerYear
                        ? `${Math.round(
                            (emissions.totalEmissionsLbsCO2ePerYear /
                              emissions.usAverageHouseholdLbsCO2ePerYear -
                              1) *
                              100
                          )}% above average`
                        : `${Math.round(
                            (1 -
                              emissions.totalEmissionsLbsCO2ePerYear /
                                emissions.usAverageHouseholdLbsCO2ePerYear) *
                              100
                          )}% below average`}
                    </div> */}
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
