import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from '@prisma/client';
import { AdminAuthGuard } from 'src/auth/guards/Admin-auth.guard';
import { customRequest } from 'src/utils/Interfaces/CustomRequest';

@UseGuards(AdminAuthGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post('create')
  async create(@Body() NewsToCreate: CreateNewsDto, @Req() request: customRequest): Promise<News> {
    try {
      //pick-up admin_id into obj request
      const admin_id = request.user.sub;

      //create news
      return await this.newsService.create(NewsToCreate, admin_id);
    }
    catch (error) {
      throw new HttpException('Actualité non crée !', HttpStatus.BAD_REQUEST);
    }
  }

}
