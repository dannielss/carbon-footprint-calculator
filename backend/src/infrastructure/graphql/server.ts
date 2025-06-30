import { readFileSync } from "node:fs";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "./resolvers";
import { IServer } from "@/domain/interfaces";
import { useCases } from "@/usecases";

export class ApolloGraphQLServer implements IServer {
  async start(port = 4000): Promise<void> {
    const typeDefs = readFileSync(
      path.join(__dirname, "schema.graphql"),
      "utf-8"
    );

    const resolverInstance = new Resolvers(useCases);
    const resolvers = resolverInstance.resolvers;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`🚀  Server ready at: ${url}`);
  }
}
