import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { customRequest } from 'src/utils/Interfaces/CustomRequest';


@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(@Body() body: CreateEventDto, @Req() request: customRequest): Promise<Event> {
    const creator_id = request.user.sub
    return this.eventService.create(body, creator_id);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
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
