import { objectType } from "nexus";
import { encodeNodeId } from "./utils";

export const Address = objectType({
  name: "Address",
  sourceType: {
    module: "@prisma/client",
    export: "Address",
  },
  definition(t) {
    t.implements("Node");
    t.nonNull.id("id", {
      resolve: ({ id }) => encodeNodeId("Address", id),
    });
    t.nonNull.string("addressLine1", {
      resolve: ({ streetName, streetNumber }) => {
        return `${streetNumber} ${streetName}`;
      },
    });
    t.string("addressLine2", {
      resolve: ({ unit }) => unit,
    });
    t.nonNull.string("city");
    t.nonNull.string("postalCode");
    t.nonNull.string("mailingAddress", {
      resolve: ({ streetNumber, streetName, unit, city, postalCode }) => {
        return `${streetNumber} ${streetName}\n${
          unit ? `${unit}\n` : ""
        }${city}\n${postalCode}`;
      },
    });
  },
});
