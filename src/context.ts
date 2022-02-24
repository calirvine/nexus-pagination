import { PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { AddressDatasource } from "./datasources/Address";
import { ContactDatasource } from "./datasources/ContactInfo";
import { PersonDatasource } from "./datasources/Person";

export interface Context {
  personDataSource: PersonDatasource;
  addressDataSource: AddressDatasource;
  contactDataSource: ContactDatasource;
  req: FastifyRequest;
}

export function createDatasourceContext(
  db: PrismaClient
): Pick<
  Context,
  "addressDataSource" | "contactDataSource" | "personDataSource"
> {
  return {
    personDataSource: new PersonDatasource(db),
    addressDataSource: new AddressDatasource(db),
    contactDataSource: new ContactDatasource(db),
  };
}
