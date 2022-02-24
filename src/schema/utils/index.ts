import { Connection, ConnectionArguments, Edge } from "graphql-relay";

import { NexusGenAbstractTypeMembers } from "../../nexus-typegen";
import { PREFIX } from "./constants";

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

/*
  Args must provide first or last
*/
export function prismaConnectionWrapper<T>(
  list: T[],
  keyAccessFn: (arg: T) => string | number,
  { after, before, first, last }: ConnectionArguments
): Connection<T> & { nodes: T[] } {
  if ((first || last) && !(first && last)) {
    if (!list.length) return EMPTY_CONNECTION;
    let hasNextPage: boolean = false,
      hasPreviousPage: boolean = false,
      startCursor: string,
      endCursor: string;
    //Paginate forward
    if (first) {
      if (first < 0)
        throw new Error("When provided, first must be a non negative integer");
      const beginIndex = after
        ? list.findIndex((item) => cursorFromKey(keyAccessFn(item)) === after) +
          1
        : 0;
      if (beginIndex === -1)
        throw new Error("after cursor not present in list");
      if (list.slice(beginIndex).length > first) hasNextPage = true;
      if (beginIndex > 0) hasPreviousPage = true;
      const nodes = list.slice(beginIndex, beginIndex + first);
      if (nodes.length === 0) return EMPTY_CONNECTION;
      const edges: Edge<T>[] = nodes.map((node) => ({
        node: node,
        cursor: cursorFromKey(keyAccessFn(node)),
      }));
      startCursor = cursorFromKey(keyAccessFn(nodes.at(0)!));
      endCursor = cursorFromKey(keyAccessFn(nodes.at(-1)!));
      return {
        edges,
        nodes,
        pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor },
      };
    }
    //Paginate backwards
    if (last) {
      if (last < 0)
        throw new Error("When provided, last must be a non negative integer");
      const endIndex = before
        ? list.findIndex(
            (item) => cursorFromKey(keyAccessFn(item)) === before
          ) - 1
        : list.length - 1;
      if (endIndex === -1) throw new Error("before cursor not present in list");
      let startIndex = Math.max(endIndex - last + 1, 0);
      hasPreviousPage = startIndex > 0;
      hasNextPage = endIndex < list.length - 1;
      const nodes = list.slice(startIndex, endIndex + 1);
      if (nodes.length === 0) return EMPTY_CONNECTION;
      const edges: Edge<T>[] = nodes.map((node) => ({
        node: node,
        cursor: cursorFromKey(keyAccessFn(node)),
      }));
      startCursor = edges.at(0)!.cursor;
      endCursor = edges.at(-1)!.cursor;
      return {
        edges,
        nodes,
        pageInfo: { startCursor, endCursor, hasNextPage, hasPreviousPage },
      };
    }
  }
  throw new Error(
    "Either first or last, but not both, must be provided as a positive integer"
  );
}
// any is OK here because an empty connection will be identical for every possible type
const EMPTY_CONNECTION: Connection<any> & { nodes: any[] } = {
  edges: [],
  nodes: [],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  },
};

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
prismaConnectionWrapper(list, (arg) => arg, { last: 10 });

function cursorFromKey(index: string | number) {
  return Buffer.from(PREFIX + index.toString()).toString("base64");
}

export function keyFromCursor(cursor: string) {
  const [, ...key] = Buffer.from(cursor, "base64").toString().split(":");
  if (Array.isArray(key)) {
    return key.join(":");
  }
  return key;
}
