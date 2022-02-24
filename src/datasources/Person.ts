import { Person, PrismaClient } from "@prisma/client";
import { BaseDatasource } from "./BaseDatasource";
import { ConnectionArguments } from "graphql-relay";
import { keyFromCursor } from "../schema/utils";

const __typename = "Person" as const;

export class PersonDatasource extends BaseDatasource {
  constructor(db: PrismaClient) {
    super(db);
  }

  getPersonById(id: string) {
    return this.db.person.findUnique({ where: { id: id } }).then((res) => {
      if (!res) return null;
      return { ...res, __typename };
    });
  }

  async getPeopleForConnection({
    after,
    first,
    before,
    last,
  }: ConnectionArguments): Promise<Person[]> {
    if (first && !last && !before) {
      return this.db.person.findMany({
        take: after ? first + 2 : first + 1,
        cursor: after ? { id: keyFromCursor(after) } : undefined,
        orderBy: {
          lastUpdated: "desc",
        },
      });
    }
    if (last && !first && !after) {
      return this.db.person.findMany({
        take: before ? (last + 2) * -1 : (last + 1) * -1,
        cursor: before ? { id: keyFromCursor(before) } : undefined,
        orderBy: {
          lastUpdated: "desc",
        },
      });
    }
    throw new Error("First or last, but not both, must be a positive integer");
  }
}
