import { Home, Car } from "lucide-react";
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

interface FirstStepProps {
  handleBasicInfoSubmit(e: React.FormEvent): void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FirstStep: React.FC<FirstStepProps> = ({
  handleBasicInfoSubmit,
  formData,
  setFormData,
}: FirstStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-blue-700 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Carbon Footprint Calculator</h1>
          <p className="text-blue-100">
            Calculate your household's carbon emissions
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 text-xl">
              What is your carbon footprint?
            </CardTitle>
            <CardDescription className="text-blue-700">
              Take a few minutes to find out with our Household Carbon Footprint
              Calculator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="household-size">
                    Number of people in your household
                  </Label>
                  <Input
                    id="household-size"
                    type="number"
                    min="1"
                    value={formData.householdSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        householdSize: Number.parseInt(e.target.value) || 1,
                      }))
                    }
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip-code">ZIP Code</Label>
                  <Input
                    id="zip-code"
                    type="text"
                    placeholder="Enter your ZIP code"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    className="bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                >
                  Get Started
                </Button>
              </form>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-48 bg-gradient-to-b from-blue-200 to-green-200 rounded-lg p-4">
                    <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded mb-2 w-fit">
                      Home Energy
                    </div>
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded w-fit">
                      Transportation
                    </div>
                    <Home className="absolute bottom-4 right-4 w-8 h-8 text-gray-600" />
                    <Car className="absolute bottom-4 left-4 w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirstStep;
