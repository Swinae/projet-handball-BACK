import { fakerFR as faker } from '@faker-js/faker';
import { PrismaService } from '../prisma.service';
import { matchResultEnum } from '@prisma/client';

const prisma = new PrismaService();

const randomResult = (enumeration): matchResultEnum => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}

// events quantity
let matchQty = 10;

const main = async () => {
    while (matchQty) {
        await prisma.match.create({
            data: {
                is_home : Math.random() >= 0.5,
                score_home: Math.floor(Math.random() * 5),
                score_visitor: Math.floor(Math.random() * 5),
                rival_team: faker.commerce.productName(),
                result: randomResult(matchResultEnum),
            }
        });

        matchQty--
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
