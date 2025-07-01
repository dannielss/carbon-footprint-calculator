import path from "node:path";
import http from "http";
import cors from "cors";
import rateLimit from "express-rate-limit";
import express from "express";
import { readFileSync } from "node:fs";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "./resolvers";
import { IServer } from "@/domain/interfaces";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import { ElectricityFactorRepository } from "@/repositories/electricity-factor-repository";
import { CalculateCarbonFootprintUseCase } from "@/usecases/calculate-carbon-footprint";

export class ApolloGraphQLServer implements IServer {
  async start(port = 4000): Promise<void> {
    const app = express();
    const httpServer = http.createServer(app);

    const typeDefs = readFileSync(
      path.join(__dirname, "schema.graphql"),
      "utf-8"
    );

    const electricityRepo = new ElectricityFactorRepository();
    const calculateCarbonFootprint = new CalculateCarbonFootprintUseCase(
      electricityRepo
    );

    const useCases = {
      calculateCarbonFootprint,
    };

    const resolverInstance = new Resolvers(useCases);
    const resolvers = resolverInstance.resolvers;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
      "/graphql",
      cors(),
      express.json(),
      rateLimit({
        windowMs: 60 * 1000,
        max: 30,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          error: {
            message: "Too many requests, please try again later.",
          },
        },
        handler: (_, res) => {
          res.status(429).json({
            data: null,
            error: {
              message: "Too many requests, please try again later.",
            },
          });
        },
      }),
      expressMiddleware(server)
    );
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  }
}
