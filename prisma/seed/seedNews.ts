import { fakerFR as faker } from '@faker-js/faker';
import { PrismaService } from '../prisma.service';

const prisma = new PrismaService();

// events quantity
let newsQty = 20;

const main = async () => {
    while (newsQty) {
        await prisma.news.create({
            data: {
                title : faker.lorem.lines(1),
                content: faker.lorem.paragraph(2),
                img: faker.image.urlLoremFlickr({ category: 'abstract' }),
                creator_id: faker.number.int({ max: 42 })
            }
        });

        newsQty--
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
