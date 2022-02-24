import { extendType, objectType, queryType } from "nexus";
import { encodeNodeId, prismaConnectionWrapper } from "./utils";
import { connectionFromArraySlice, fromGlobalId } from "graphql-relay";
import { sleep } from "../utils";
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
      resolve: ({ id }) => encodeNodeId("Person", id.toString()),
    });
    t.nonNull.string("fullname", {
      resolve: async ({ firstName, middleNames, lastName, suffix }) => {
        return [firstName, middleNames, lastName, suffix]
          .join(" ")
          .replace(/ +(?= )/g, "");
      },
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
      resolve: async ({ contactInfoId }, _, { contactDataSource }) => {
        await sleep(Math.floor(Math.random() * 4000));
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
      resolve: async function (_, args, ctx) {
        const data = await ctx.personDataSource.getPeopleForConnection(args);
        return prismaConnectionWrapper(data, (args) => args.id, args);
      },
    });
  },
});
