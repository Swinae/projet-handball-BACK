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

const admins: Admin[] = [
  {
    firstname: "Élise",
    lastname: "Lefebvre",
    email: "elise.lefebvre@hotmail.com",
    password: "azerty01",
    role: "ADMIN"
  },
  {
    firstname: "Jean",
    lastname: "Dupont",
    email: "jean.dupont@example.com",
    password: "password02",
    role: "ADMIN"
  },
  {
    firstname: "Marie",
    lastname: "Curie",
    email: "marie.curie@example.com",
    password: "password03",
    role: "ADMIN"
  },
  {
    firstname: "Paul",
    lastname: "Durand",
    email: "paul.durand@example.com",
    password: "password04",
    role: "ADMIN"
  }
];

// Fonction pour créer un administrateur
const createAdmin = async (admin: Admin) => {
  // Hacher le mot de passe
  admin.password = await authService.hashPassword(admin.password);
  
  // Interroger la base de données pour créer l'administrateur
  await prisma.users.create({ data: admin });

  console.log(`Admin ${admin.email} created successfully.`);
}

const createAllAdmins = async () => {
  for (const admin of admins) {
    await createAdmin(admin);
  }
  console.log('All admins created successfully.');
}

createAllAdmins()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
