import { Person, PrismaClient } from "@prisma/client";
import { BaseDatasource } from "./BaseDatasource";
import { NexusGenFieldTypes } from "../nexus-typegen";

const __typename = "Person" as const;

export class PersonDatasource extends BaseDatasource {
  constructor(db: PrismaClient) {
    super(db);
  }

  getPersonById(id: string) {
    return this.db.person.findUnique({ where: { id } }).then((res) => {
      if (!res) return null;
      return { ...res, __typename };
    });
  }

  async getPeopleForConnection({
    after,
    first,
  }: {
    // args
    after?: string | null; // String
    first: number; // Int
  }): Promise<NexusGenFieldTypes["PersonConnection"]> {
    const data = await this.db.person.findMany({
      take: first + 1,
      skip: after ? 1 : undefined,
      cursor: after ? { id: idFromCursor(after) } : undefined,
      orderBy: {
        lastUpdated: "desc",
      },
    });

    const hasNextPage = data.length === first + 1;

    const pageInfo: NexusGenFieldTypes["PersonConnection"]["pageInfo"] = {
      hasNextPage: hasNextPage,
      hasPreviousPage: false,
      endCursor: cursorFromId(
        hasNextPage ? data[data.length - 2].id : data[data.length - 1].id
      ),
    };
    const nodes: NexusGenFieldTypes["PersonConnection"]["nodes"] = hasNextPage
      ? data.slice(0, -1)
      : data;
    const edges: NexusGenFieldTypes["PersonConnection"]["edges"] =
      nodes.map(edgeFromPerson);
    return { pageInfo, nodes, edges };
  }
}

function edgeFromPerson(person: Person): NexusGenFieldTypes["PersonEdge"] {
  return {
    node: person,
    cursor: cursorFromId(person.id),
  };
}

function cursorFromId(id: string) {
  return Buffer.from(id).toString("base64");
}

function idFromCursor(cursor: string) {
  return Buffer.from(cursor, "base64").toString();
}
