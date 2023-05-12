import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { useDeferStream } from "@graphql-yoga/plugin-defer-stream";

import { schema } from "./schema";

const yoga = createYoga({
  schema,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
  plugins: [useDeferStream()],
});

export const server = createServer(yoga);
