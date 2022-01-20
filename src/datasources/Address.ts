import { PrismaClient } from "@prisma/client";
import { BaseDatasource } from "./BaseDatasource";

const __typename = "Address" as const;

export class AddressDatasource extends BaseDatasource {
  constructor(db: PrismaClient) {
    super(db);
  }

  getAddressById(id: string) {
    return this.db.address.findUnique({ where: { id } }).then((res) => {
      if (!res) return null;
      return { ...res, __typename };
    });
  }
}
