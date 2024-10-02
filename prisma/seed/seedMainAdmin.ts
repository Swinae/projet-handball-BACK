import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../prisma.service';
import { UserRoleEnum } from '@prisma/client';

const prisma = new PrismaService();

const jwtService = new JwtService();

const authService = new AuthService(jwtService, prisma);

interface Admin {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}

const admin : Admin = {
  firstname: "Élise",
  lastname: "Lefebvre",
  email: "elise.lefebvre@hotmail.com",
  password: "azerty01",
  role: "ADMIN"
}

const createAdmin =  async (admin : Admin) => {
  //hashed pwd
  admin.password = await authService.hashPassword(admin.password);
  
  // query db to create admin
  await prisma.users.create({data : admin})

  console.log("Admin created successfully.");
}

createAdmin (admin)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })