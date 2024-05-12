import { fakerFR as faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from '@prisma/client';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../prisma.service';

const prisma = new PrismaService();

const jwtService = new JwtService();

const authService = new AuthService(jwtService, prisma);

const roles: UserRoleEnum[] = ["ADMIN", "SUPPORTER", "PLAYER"];

// users quantity
let usersQty = 20;

const main = async () => {
  while (usersQty) {
    //generate a random index
    const randomRoleIndex = Math.floor(Math.random() * roles.length);

    const randomRole = roles[randomRoleIndex];

    //generate a random password
    const password = await authService.hashPassword(faker.internet.password());

    await prisma.users.create({
      data: {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: password,
        phone_number: faker.phone.number(),
        role: randomRole,
        avatar: faker.internet.url(),
        description: faker.lorem.paragraph(2),
      }
    });

    usersQty--
  }
  console.log("Seed completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
