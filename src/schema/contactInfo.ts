import { objectType } from "nexus";
import { encodeNodeId } from "./utils";

export const ContactInfo = objectType({
  name: "ContactInfo",
  sourceType: {
    module: "@prisma/client",
    export: "ContactInfo",
  },
  definition(t) {
    t.implements("Node");
    t.nonNull.id("id", {
      resolve: ({ id }) => encodeNodeId("ContactInfo", id),
    });
    t.string("email");
    t.string("phoneNumber");
  },
});
