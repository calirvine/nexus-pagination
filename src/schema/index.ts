import {
  queryType,
  makeSchema,
  interfaceType,
  nonNull,
  idArg,
  connectionPlugin,
  list,
} from "nexus";

import { join } from "path";

import * as PersonTypes from "./person";
import * as AddressTypes from "./address";
import * as ContactTypes from "./contactInfo";
import { extractTypeandIdFromNodeId } from "./utils";
import { Context } from "../context";

const Node = interfaceType({
  name: "Node",
  definition(t) {
    t.nonNull.id("id", {
      description: "Resource unique identifier",
    });
  },
});

function resolveNode(
  nodeId: string,
  { personDataSource, addressDataSource, contactDataSource }: Context
) {
  const { __typename, id } = extractTypeandIdFromNodeId<"Node">(nodeId);
  switch (__typename) {
    case "Person": {
      return personDataSource.getPersonById(id);
    }
    case "Address": {
      return addressDataSource.getAddressById(id);
    }
    case "ContactInfo": {
      return contactDataSource.getContactById(id);
    }
  }
}

const Query = queryType({
  definition(t) {
    t.field("ok", {
      type: "Boolean",
      resolve: () => true,
    });

    t.field("node", {
      type: "Node",
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_, { id }, ctx) => {
        return resolveNode(id, ctx);
      },
    });
    t.nonNull.list.field("nodes", {
      type: "Node",
      args: {
        ids: nonNull(list(nonNull("ID"))),
      },
      resolve: (_, { ids }, ctx) => {
        return ids.map((id) => resolveNode(id, ctx));
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Node, PersonTypes, AddressTypes, ContactTypes],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "..", "schema.graphql"),
  },
  contextType: {
    module: join(__dirname, "..", "./context.ts"),
    export: "Context",
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
      __typename: true,
    },
  },
  plugins: [
    connectionPlugin({
      includeNodesField: true,
    }),
  ],
});
