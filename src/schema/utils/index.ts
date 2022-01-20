import { fromGlobalId, toGlobalId } from "graphql-relay";

import { NexusGenAbstractTypeMembers } from "../../nexus-typegen";

export function encodeNodeId<T extends NexusGenAbstractTypeMembers["Node"]>(
  __typename: T,
  id: string
) {
  const base64Type = Buffer.from(__typename)
    .toString("base64")
    .replaceAll("=", "");
  return `${base64Type}-${id}`;
}

export function extractTypeandIdFromNodeId<
  T extends keyof NexusGenAbstractTypeMembers
>(
  nodeId: string
): {
  __typename: NexusGenAbstractTypeMembers[T];
  id: string;
} {
  const [typePart, ...id] = nodeId.split("-");

  const type = Buffer.from(typePart, "base64").toString();
  return {
    __typename: type as NexusGenAbstractTypeMembers[T],
    id: id.join("-"),
  };
}
