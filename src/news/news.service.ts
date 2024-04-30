import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'prisma/prisma.service';
import { News } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) { }

  //This actions interroge db via prismaClient to do a crud in table News

  async create(NewsToCreate: CreateNewsDto,  admin_id: any): Promise<News> {
    return await this.prisma.news.create({ data: { ...NewsToCreate, creator_id:  admin_id } });
  }
}
