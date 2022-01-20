import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

import { schema } from "./schema";
import { Context } from "./context";
import { encodeNodeId } from "./schema/utils";

const prisma = new PrismaClient();

// uncomment to get some IDs console logged

// prisma.address.findMany({ take: 2 }).then((res) => {
//   const list = res.map((address) => ({
//     addressId: address.id,
//     relayAddressId: encodeNodeId("Address", address.id),
//   }));
//   console.log(list);
// });
// prisma.person.findMany({ take: 2 }).then((res) => {
//   const list = res.map((person) => ({
//     personId: person.id,
//     relayPersonId: encodeNodeId("Person", person.id),
//   }));
//   console.log(list);
// });
// prisma.contactInfo.findMany({ take: 2 }).then((res) => {
//   const list = res.map((contact) => ({
//     contactId: contact.id,
//     relayContactId: encodeNodeId("ContactInfo", contact.id),
//   }));
//   console.log(list);
// });

export const server = new ApolloServer({
  schema,
  context: () => {
    return new Context(prisma);
  },
});
