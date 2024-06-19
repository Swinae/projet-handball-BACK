import { fakerFR as faker } from '@faker-js/faker';
import { EventTypeEnum } from '@prisma/client';
import { PrismaService } from '../prisma.service';

const prisma = new PrismaService();

const type: EventTypeEnum[] = ["MATCH", "ENTRAINEMENT", "APERO"];

// events quantity
let eventsQty = 20;

const main = async () => {
    while (eventsQty) {
        //generate a random index
        const randomTypeIndex = Math.floor(Math.random() * type.length);

        const randomType = type[randomTypeIndex];

        await prisma.event.create({
            data: {
                type: randomType,
                title : faker.lorem.lines(1),
                content: faker.lorem.paragraph(2),
                adress: faker.location.streetAddress(),
                img: faker.image.urlLoremFlickr({ category: 'abstract' }),
                start_time: faker.date.anytime(),
                end_time: faker.date.anytime(),
                creator_id: faker.number.int({ max: 41 })
            }
        });

        eventsQty--
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
