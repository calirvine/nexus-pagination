import faker from "@faker-js/faker";
import { Person, Address, ContactInfo, PrismaClient } from "@prisma/client";

const db = new PrismaClient();
faker.locale = "en_CA";

type OmitGenerated<T> = Omit<
  T,
  | "id"
  | "createdAt"
  | "lastUpdated"
  | "contactInfoId"
  | "addressId"
  | "personId"
>;

function mockPerson(): OmitGenerated<Person> {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleNames: Math.random() > 0.5 ? faker.name.middleName() : null,
    suffix: Math.random() > 0.8 ? faker.name.suffix() : null,
  };
}

function mockAddress(): OmitGenerated<Address> {
  return {
    streetName: faker.address.streetName(),
    streetNumber: Math.floor(Math.random() * 250).toString(),
    unit: Math.random() > 0.6 ? faker.address.secondaryAddress() : null,
    city: faker.address.city(),
    postalCode: faker.address.zipCode(),
  };
}

function mockContact(): OmitGenerated<ContactInfo> {
  return {
    email: Math.random() > 0.1 ? faker.internet.email() : null,
    phoneNumber: Math.random() > 0.05 ? faker.phone.phoneNumber() : null,
  };
}

async function generateSeed() {
  for (let i = 0; i < 1000; i += 1) {
    let batch: {
      person: ReturnType<typeof mockPerson>;
      address: ReturnType<typeof mockAddress>;
      contact: ReturnType<typeof mockContact>;
    }[] = [];
    for (let k = 0; k < 10; k += 1) {
      batch.push({
        person: mockPerson(),
        contact: mockContact(),
        address: mockAddress(),
      });
    }
    const runBatch = batch.map(({ person, contact, address }) => {
      return db.person.create({
        data: {
          ...person,
          contactInfo: { create: contact },
          address: { create: address },
        },
      });
    });
    await Promise.all(runBatch);
  }
}
generateSeed();
