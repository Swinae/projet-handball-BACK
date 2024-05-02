import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Event } from '@prisma/client';

@Injectable()

export class EventService {

    constructor(private readonly prisma: PrismaService) { }


    async create(data: CreateEventDto): Promise<Event> {
        return this.prisma.event.create({data})
    }

    async findAll():Promise<Event[]> {
        return this.prisma.event.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} event`;
    }

    update(id: number, updateEventDto: UpdateEventDto) {
        return `This action updates a #${id} event`;
    }

    async delete(id: number): Promise<Event> {
        return this.prisma.event.delete({
            where: {
                id
            }
        });
    }
}
