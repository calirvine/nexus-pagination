import fs from "fs/promises";
import { printSchema } from "graphql";

import { schema } from "./schema";
import { server } from "./server";

server.listen(3000, async () => {
  await generateSchemaOutput();
  console.log("Visit http://localhost:3000/graphql");
});

async function generateSchemaOutput() {
  await fs.writeFile("./schema.graphql", printSchema(schema));
  console.log("Wrote schema to ./schema.graphql");
}
