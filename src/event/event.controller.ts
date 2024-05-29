import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { AuthGuard } from 'src/middleware/guards/auth.guard';
import { RoleGuard } from 'src/middleware/guards/role.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("Event")
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  create(@Body() body: CreateEventDto): Promise<Event> {
    console.log('test');
    return this.eventService.create(body);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Event> {
    return this.eventService.delete(id);
  }
}
