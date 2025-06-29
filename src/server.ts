import { readFileSync } from "node:fs";
import { resolvers } from "./infrastructure/graphql/resolvers";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import path from "node:path";

async function startServer() {
  const typeDefs = readFileSync(
    path.join(__dirname, "./infrastructure/graphql/schema.graphql"),
    "utf-8"
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const PORT = 4000;
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
