import { ApolloGraphQLServer } from "./infrastructure/graphql/server";

async function bootstrap() {
  const server = new ApolloGraphQLServer();
  await server.start();
}

bootstrap();
