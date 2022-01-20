import { PrismaClient } from "@prisma/client";

export class BaseDatasource {
  db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }
}
