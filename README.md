# 🌱 Carbon Footprint Calculator

This repository contains both a **frontend** and a **backend** project for calculating personalized carbon emissions based on housing and travel inputs, and comparing them against the US average.

---

## Backend — Carbon Footprint Calculator API

A **GraphQL API** built with **Node.js**, **ExpressJS**, **TypeScript**, and **Apollo Server**, designed with **Clean Architecture** principles for maintainability, testability, and separation of concerns.

### Features

- Calculate emissions for housing (electricity, gas, water, waste, etc.) and travel (vehicle, bus, metro, air, etc.)
- Uses eGRID real-world emission data by ZIP code
- Compares results to US average household emissions
- 100% test coverage with Jest
- Apollo Server with Express, CORS, and rate limiting
- Strongly typed with TypeScript

### Backend Folder Structure

```
├── src/
│   ├── domain/               # Business models, interfaces
│   ├── usecases/             # Application logic
│   ├── infrastructure/       # Repositories, external data access
│   ├── main/                 # GraphQL server, schema, and resolvers
│   ├── lib/                  # Utilities (e.g. eGRID, conversions)
│   ├── static/               # Static data files (eGRID CSV)
├── tests/                    # Unit tests
├── main.ts                   # App bootstrap
└── package.json
```

---

## Frontend — Carbon Footprint Calculator UI

A React-based frontend built with Vite, TailwindCSS, and Shadcn/UI components designed for usability and full test coverage.

### Features

- Input forms for housing and travel data
- Emission calculations using the backend API
- Responsive and accessible UI
- 100% test coverage with Vitest and React Testing Library

### Frontend Folder Structure

```
├── src/
│   ├── components/           # React components
│   ├── hooks/                # Data fetching and business logic hooks
│   ├── types/                # TS Interfaces/types
│   ├── lib/                  # Utils
│   ├── test                  # Vitest setup/mocks
│   ├── App.tsx               # Main app component
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🛠️ Tech Stack

| Layer            | Tech Used                                                     |
| ---------------- | ------------------------------------------------------------- |
| **Language**     | TypeScript                                                    |
| **API**          | Apollo Server + GraphQL                                       |
| **Routing**      | Express.js                                                    |
| **Architecture** | Clean Architecture (Domain, UseCases, Repos)                  |
| **Testing**      | Vitest + React Testing Library + Jest + Apollo MockedProvider |
| **Frontend**     | ReactJS + Vite + TailwindCSS + Shadcn/UI                      |

---

## ⚙️ Setup & Configuration

> ⚠️ **Environment Info**  
> This project uses **Node.js v20.18.3** and **npm v10.8.2**.  
> Make sure these versions are installed for compatibility.

### 1. Install dependencies

```bash
npm install
```

---

## 🚀 Run the Backend

```bash
npm run dev
```

Access GraphQL Playground at:

```
http://localhost:4000/graphql
```

## 🚀 Run the Frontend

```bash
npm run dev
```

Access Carbon Footprint Calculator App at:

```
http://localhost:5173
```

---

## 🔬 Example GraphQL Query

```graphql
query CalculateCarbonFootprint($housing: HousingInput!, $travel: TravelInput) {
  calculateCarbonFootprint(housing: $housing, travel: $travel) {
    housingEmissionsLbsCO2ePerYear
    travelEmissionsLbsCO2ePerYear
    totalEmissionsLbsCO2ePerYear
    usAverageHouseholdLbsCO2ePerYear
  }
}
```

Sample variables:

```json
{
  "housing": {
    "zipCode": "12345",
    "householdSize": 2,
    "electricityKWhPerMonth": 120,
    "fuelOilGallonsPerMonth": 30,
    "lpgGallonsPerMonth": 10,
    "naturalGasThermsPerMonth": 50,
    "wasteLbsPerMonth": 40,
    "waterGallonsPerMonth": 800
  },
  "travel": {
    "busMilesPerMonth": 20,
    "flyingMilesPerMonth": 150,
    "metroMilesPerMonth": 10,
    "railMilesPerMonth": 15,
    "taxiMilesPerMonth": 5,
    "vehicleMilesPerMonth": 400
  }
}
```

---

## 🧪 Run Tests

### Backend

```bash
npm run test
```

With coverage:

```bash
npm run test --coverage
```

### Frontend

```bash
npm test
```

With coverage:

```bash
npm run test:coverage
```

---

## 🧼 Clean Architecture Overview

- **Domain**: Business models, entities, and interfaces
- **UseCases**: Application business logic implementations
- **Infrastructure**: Data repositories and external API access
- **Presentation/Server**: Apollo Server, Express setup, schema and resolvers

Benefits:

- Clear separation of concerns
- Easier testing and maintenance
- Flexible to add new features and integrations

---

## 🧱 Best Practices & Patterns

- Apollo Client `MockedProvider` for GraphQL testing
- Repository pattern for data abstraction (e.g., eGRID data access)
- Utility functions for unit conversions and safety checks
- `Rate limiting` middleware for basic API protection
- Typed inputs and outputs with TypeScript
- Frontend componentization
- Custom hooks to enhance code readability

---

## :camera: Screenshots

<details>

<summary>UI</summary>

![Screenshot 2025-06-30 at 22 21 37](https://github.com/user-attachments/assets/89881c55-0b45-4078-a2ac-dcb8b6fee3c6)

![Screenshot 2025-06-30 at 22 21 37](https://github.com/user-attachments/assets/117a79a1-914b-4267-9191-c7d636230d3a)

![Screenshot 2025-07-01 at 02 41 45](https://github.com/user-attachments/assets/0c09cbeb-37f8-4936-8e22-48915530e45a)

<img src="https://github.com/user-attachments/assets/f3ba5009-4094-49cd-b71f-312fcc0a1c1e" width="350" />
<img src="https://github.com/user-attachments/assets/27d9962b-71f6-455e-a4a7-ff84d56caf43" width="350" />

</details>

<details>
<summary>Coverage</summary>

![Screenshot 2025-06-30 at 22 19 57](https://github.com/user-attachments/assets/e7a3fda1-35c3-4ece-a5e3-7e9cba9520b1)
![Screenshot 2025-07-01 at 02 43 50](https://github.com/user-attachments/assets/d1754628-9b56-414e-809d-83ac0a9a0ef1)

</details>
