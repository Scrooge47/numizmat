import "reflect-metadata";
import { NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/schema";
import { prisma } from "src/prisma";
import { Context } from "src/schema/context";
import { getSession } from 'next-auth/client';
import { fromPairs } from "lodash";

const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {

    const session = await getSession({ req });

    return {
      prisma,
      session
    };
  },
  tracing: process.env.NODE_ENV === "development",
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false
  },
};

export default handler;
