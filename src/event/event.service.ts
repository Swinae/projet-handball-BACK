import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Event } from '@prisma/client';

@Injectable()

export class EventService {

    constructor(private readonly prisma: PrismaService) { }


    async create(data: CreateEventDto, creator_id: number): Promise<Event> {
        return this.prisma.event.create(
            {
                data: {
                    ...data,
                    creator_id
                } 

            }
        )
    }

    async findAll():Promise<Event[]> {
        return this.prisma.event.findMany()
    }

    async findOne(id: number): Promise<Event> {
        return this.prisma.event.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, data: UpdateEventDto): Promise<Event> {
        return this.prisma.event.update({
            where: {
                id
            }, 
            data
        });
    }

    async delete(id: number): Promise<Event> {
        return this.prisma.event.delete({
            where: {
                id
            }
        });
    }
}
