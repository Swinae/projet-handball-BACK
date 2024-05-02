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

  async update1News(id: number, newsToUpdateDto: UpdateNewsDto): Promise<News> {
    return await this.prisma.news.update({
      where: {
        id
      },
      data: {
        ...newsToUpdateDto,
        updated_at: new Date().toISOString()
      }
    });
  }

  async deleteOneNews(id: number){
    return await this.prisma.news.delete({where: {id}})
  }
  
  async deleteAllNews() {
    const response = await this.prisma.news.deleteMany();
    
    // reinitialize auto-incrémentation de l'ID
    await this.prisma.$queryRaw`ALTER TABLE News AUTO_INCREMENT = 1`;
    
    console.log('La table news a été réinitialisée avec succès.');
    
    return response
  }

  async findAll(): Promise<News[]> {
    return await this.prisma.news.findMany();
  }

  async findOneNews(id: number): Promise<News> {
    return await this.prisma.news.findUnique({
      where: {
        id
      }
    });
  }

}
