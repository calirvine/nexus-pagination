import { PrismaClient } from "@prisma/client";
import { AddressDatasource } from "./datasources/Address";
import { ContactDatasource } from "./datasources/ContactInfo";
import { PersonDatasource } from "./datasources/Person";

export class Context {
  personDataSource: PersonDatasource;
  addressDataSource: AddressDatasource;
  contactDataSource: ContactDatasource;
  constructor(db: PrismaClient) {
    this.personDataSource = new PersonDatasource(db);
    this.addressDataSource = new AddressDatasource(db);
    this.contactDataSource = new ContactDatasource(db);
  }
}
