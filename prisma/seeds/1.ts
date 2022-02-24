import faker from "@faker-js/faker";
import { Person, Address, ContactInfo, PrismaClient } from "@prisma/client";

const db = new PrismaClient();
faker.locale = "en_CA";

type OmitGenerated<T> = Omit<
  T,
  "id" | "contactInfoId" | "addressId" | "personId"
>;

function mockPerson(): OmitGenerated<Person> {
  const createdAt = faker.datatype.datetime({ min: 0, max: Date.now() });
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleNames: Math.random() > 0.5 ? faker.name.middleName() : null,
    suffix: Math.random() > 0.8 ? faker.name.suffix() : null,
    createdAt,
    lastUpdated: faker.datatype.datetime({ min: createdAt, max: Date.now() }),
  };
}

function mockAddress(): OmitGenerated<Address> {
  const createdAt = faker.datatype.datetime({ min: 0, max: Date.now() });
  return {
    streetName: faker.address.streetName(),
    streetNumber: Math.floor(Math.random() * 250).toString(),
    unit: Math.random() > 0.6 ? faker.address.secondaryAddress() : null,
    city: faker.address.city(),
    postalCode: faker.address.zipCode(),
    createdAt,
    lastUpdated: faker.datatype.datetime({ min: createdAt, max: Date.now() }),
  };
}

function mockContact(): OmitGenerated<ContactInfo> {
  const createdAt = faker.datatype.datetime({ min: 0, max: Date.now() });
  return {
    email: Math.random() > 0.1 ? faker.internet.email() : null,
    phoneNumber: Math.random() > 0.05 ? faker.phone.phoneNumber() : null,
    createdAt,
    lastUpdated: faker.datatype.datetime({ min: createdAt, max: Date.now() }),
  };
}

async function generateSeed() {
  console.log("Clearing past seed");
  const deletePeople = await db.person.deleteMany({});
  const deleteAddress = await db.address.deleteMany({});
  const deleteContact = await db.contactInfo.deleteMany({});
  console.log("Finished clearing seeds", {
    deleteAddress,
    deleteContact,
    deletePeople,
  });
  console.log("Regenerating seeds...");
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
  console.log("Generated the following numbers:");
  const peopleCount = await db.person.count();
  const addressCount = await db.address.count();
  const contactInfoCount = await db.contactInfo.count();
  console.log(
    `people: ${peopleCount}, address: ${addressCount}, contactInfoCount: ${contactInfoCount}`
  );
}
generateSeed();
