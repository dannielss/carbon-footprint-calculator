import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { describe, it, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST } from "../test/mocks/calculate_carbon_footprint";
import { CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST_WITH_ERROR } from "../test/mocks/calculate_carbon_footprint_with_error";
import { CALCULATE_CARBON_FOOTPRINT_WITH_TRAVEL_DATA_MOCK_REQUEST } from "../test/mocks/calculate_carbon_footprint_with_travel_data";
import { CALCULATE_CARBON_FOOTPRINT_ABOVE_AVERAGE_MOCK_REQUEST } from "../test/mocks/calculate_carbon_footprint_above_average";

describe("App flow", () => {
  it("should display summary", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_WITH_TRAVEL_DATA_MOCK_REQUEST]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await userEvent.type(screen.getByLabelText(/zip code/i), "3");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");
    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    const electricityInput = screen.getByLabelText(/electricity/i);
    await userEvent.clear(electricityInput);
    await userEvent.type(electricityInput, "150");

    const travelTab = await screen.findByTestId("travel");
    await userEvent.click(travelTab);

    const housingEmissions = (
      await screen.findAllByText("5000 lbs CO₂e/year")
    ).at(0);

    expect(housingEmissions).toBeInTheDocument();
  });

  it("should display summary with above US average", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_ABOVE_AVERAGE_MOCK_REQUEST]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await userEvent.type(screen.getByLabelText(/zip code/i), "1");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");
    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    const aboveLabel = await screen.findByText(/above/i);

    expect(aboveLabel).toBeInTheDocument();
  });

  it("lets user complete the first step and go to second step", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    const zipInput = screen.getByLabelText(/zip code/i);
    await userEvent.clear(zipInput);
    await userEvent.type(zipInput, "4");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");

    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    expect(
      await screen.findByText(/Enter your monthly usage for each category/i)
    ).toBeInTheDocument();
  });

  it("lets user type into housing inputs", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await userEvent.type(screen.getByLabelText(/zip code/i), "4");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");
    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    const electricityInput = screen.getByLabelText(/electricity/i);
    await userEvent.clear(electricityInput);
    await userEvent.type(electricityInput, "150");

    const fuelInput = screen.getByLabelText(/fuel/i);
    await userEvent.clear(fuelInput);
    await userEvent.type(fuelInput, "150");

    const lpgInput = screen.getByLabelText(/lpg/i);
    await userEvent.clear(lpgInput);
    await userEvent.type(lpgInput, "150");

    const naturalGasInput = screen.getByLabelText(/natural gas/i);
    await userEvent.clear(naturalGasInput);
    await userEvent.type(naturalGasInput, "150");

    const wasteInput = screen.getByLabelText(/waste/i);
    await userEvent.clear(wasteInput);
    await userEvent.type(wasteInput, "150");

    const waterInput = screen.getByLabelText(/water/i);
    await userEvent.clear(waterInput);
    await userEvent.type(waterInput, "150");

    expect(electricityInput).toHaveValue("150");
    expect(fuelInput).toHaveValue("150");
    expect(lpgInput).toHaveValue("150");
    expect(naturalGasInput).toHaveValue("150");
    expect(wasteInput).toHaveValue("150");
    expect(waterInput).toHaveValue("150");
  });

  it("lets user type into travel inputs", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await userEvent.type(screen.getByLabelText(/zip code/i), "4");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");
    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    const travelTab = await screen.findByTestId("travel");
    await userEvent.click(travelTab);

    const vehichleInput = screen.getByLabelText(/personal vehicle/i);
    await userEvent.clear(vehichleInput);
    await userEvent.type(vehichleInput, "150");

    const busInput = screen.getByLabelText(/bus/i);
    await userEvent.clear(busInput);
    await userEvent.type(busInput, "150");

    const flyingInput = screen.getByLabelText(/flying/i);
    await userEvent.clear(flyingInput);
    await userEvent.type(flyingInput, "150");

    const metroInput = screen.getByLabelText(/metro/i);
    await userEvent.clear(metroInput);
    await userEvent.type(metroInput, "150");

    const railInput = screen.getByLabelText(/rail/i);
    await userEvent.clear(railInput);
    await userEvent.type(railInput, "150");

    const taxiInput = screen.getByLabelText(/taxi/i);
    await userEvent.clear(taxiInput);
    await userEvent.type(taxiInput, "150");

    expect(vehichleInput).toHaveValue("150");
    expect(busInput).toHaveValue("150");
    expect(flyingInput).toHaveValue("150");
    expect(metroInput).toHaveValue("150");
    expect(railInput).toHaveValue("150");
    expect(taxiInput).toHaveValue("150");
  });

  it("lets user go back to first step", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await userEvent.type(screen.getByLabelText(/zip code/i), "4");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");
    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    const goBackButton = await screen.findByRole("button", {
      name: "Back to Start",
    });

    await userEvent.click(goBackButton);

    const startButton = await screen.getByRole("button", {
      name: "Get Started",
    });
    expect(startButton).toBeInTheDocument();
  });

  it("displays error message on GraphQL failure", async () => {
    render(
      <MockedProvider
        mocks={[CALCULATE_CARBON_FOOTPRINT_MOCK_REQUEST_WITH_ERROR]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await userEvent.type(screen.getByLabelText(/zip code/i), "2");
    const householdInput = screen.getByTestId("household-size");
    await userEvent.type(householdInput, "2");
    const button = screen.getByRole("button", { name: "Get Started" });
    await userEvent.click(button);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
