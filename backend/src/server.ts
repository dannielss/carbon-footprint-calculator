import { ApolloGraphQLServer } from "./infrastructure/graphql/server";
import { loadEgridData } from "./lib/egrid";

async function bootstrap() {
  try {
    await loadEgridData();

    const server = new ApolloGraphQLServer();
    await server.start();
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

bootstrap();
