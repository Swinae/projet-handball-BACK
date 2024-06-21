import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { AuthGuard } from '../../src/auth/guards/auth.guard';
import { RoleGuard } from '../../src/auth/guards/role.guard';
import { customRequest } from 'src/utils/Interfaces/CustomRequest';


@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(@Body() body: CreateEventDto, @Req() request: customRequest): Promise<Event> {
    try {
      const creator_id = request.user.sub
      return this.eventService.create(body, creator_id);
    } catch (error) {
      throw new HttpException("Echec, impossible de créer l'événement", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll(): Promise<Event[]> {
    try {
      return this.eventService.findAll();
    } catch (error) {
      throw new HttpException("Echec, impossible de charger la liste des événements", HttpStatus.BAD_REQUEST);
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: string): Promise<Event> {
    return this.eventService.delete(+id);
  }
}
