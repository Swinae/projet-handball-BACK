import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req, Put, Get, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from '@prisma/client';
import { AdminAuthGuard } from 'src/guards/Admin-auth.guard';
import { customRequest } from 'src/utils/Interfaces/CustomRequest';
import { Public } from 'src/customsDecorators/publicDecorator';

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

  @Delete('delete/:news_id')
  async delelete1News(@Param('news_id') news_id: string) {
    try {
      const newsDeleted = await this.newsService.deleteOneNews(+news_id);
      if (newsDeleted) {
        return HttpStatus.NO_CONTENT;
      }
    }
    catch (error) {
      throw new HttpException('News not deleted',HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('delete/all')
  async deleteAll() {
    try {
      const { count } = await this.newsService.deleteAllNews();
      if (count === 0) {
        return HttpStatus.NO_CONTENT;
      }
    }
    catch (error) {
      throw new HttpException({
        statut: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'internal server error !'
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }
  }

  @Public()
  @Get('list')
  async findAll(): Promise<News[] | HttpStatus> {
    try {
      const newsList = await this.newsService.findAll(); //console.log(newsList);
      if (newsList.length != 0) {
        return newsList;
      }
      else {
        return HttpStatus.NO_CONTENT;
      }
    }
    catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Public()
  @Get('id/:news_id')
  async findOneNews(@Param('news_id') news_id: string): Promise<News | HttpStatus> {
    try {
      const newsFound = await this.newsService.findOneNews(+news_id);      
      if(newsFound === null){
        return HttpStatus.NOT_FOUND;
      }
      return newsFound;
    }
    catch (error) {
      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
