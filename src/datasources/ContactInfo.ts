import { PrismaClient } from "@prisma/client";
import { BaseDatasource } from "./BaseDatasource";

const __typename = "ContactInfo" as const;
export class ContactDatasource extends BaseDatasource {
  constructor(db: PrismaClient) {
    super(db);
  }

  getContactById(id: string) {
    return this.db.contactInfo.findUnique({ where: { id } }).then((res) => {
      if (!res) return null;
      return { ...res, __typename };
    });
  }
}
