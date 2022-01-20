import { extendType, objectType, queryType } from "nexus";
import { encodeNodeId } from "./utils";
//import { Person as PersonModel } from "@prisma/client";

export const Person = objectType({
  name: "Person",
  sourceType: {
    module: "@prisma/client",
    export: "Person",
  },
  definition(t) {
    t.implements("Node");
    t.nonNull.id("id", {
      resolve: ({ id }) => encodeNodeId("Person", id),
    });
    t.nonNull.string("fullname", {
      resolve: ({ firstName, middleNames, lastName, suffix }) =>
        [firstName, middleNames, lastName, suffix]
          .join(" ")
          .replace(/ +(?= )/g, ""),
    });
    t.field("address", {
      type: "Address",
      resolve: (person, _, { addressDataSource }) => {
        if (!person.addressId) return null;
        return addressDataSource.getAddressById(person.addressId);
      },
    });
    t.field("contactInfo", {
      type: "ContactInfo",
      resolve: ({ contactInfoId }, _, { contactDataSource }) => {
        return contactInfoId
          ? contactDataSource.getContactById(contactInfoId)
          : null;
      },
    });
  },
});

export const PersonQuery = extendType({
  type: "Query",
  definition(t) {
    t.connectionField("people", {
      type: "Person",
      nullable: false,
      nonNullDefaults: {
        output: true,
      },
      disableBackwardPagination: true,
      resolve: (root, args, ctx) =>
        ctx.personDataSource.getPeopleForConnection(args),
    });
  },
});
