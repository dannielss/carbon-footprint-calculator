import { readFileSync } from "node:fs";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "./resolvers";
import { IServer } from "@/domain/interfaces";
import { useCases } from "@/usecases";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import rateLimit from "express-rate-limit";

export class ApolloGraphQLServer implements IServer {
  async start(port = 4000): Promise<void> {
    const app = express();
    const httpServer = http.createServer(app);

    const typeDefs = readFileSync(
      path.join(__dirname, "schema.graphql"),
      "utf-8"
    );

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
