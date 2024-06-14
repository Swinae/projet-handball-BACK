import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req, Put, Get, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from '@prisma/client';
import { AdminAuthGuard } from '../../src/middleware/guards/Admin-auth.guard';
import { customRequest } from '../../src/utils/interfaces/CustomRequest';
import { Public } from '../../src/customsDecorators/publicDecorator';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("News")
@UseGuards(AdminAuthGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @ApiOperation({summary:"création d'une actualité"})
  @ApiResponse({status:200, description:"Contient un objet d'actualité"})
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

  @ApiOperation({summary:"mise à jour d'une actualité"})
  @Put('update/id/:news_id')
  async update(@Param('news_id') news_id: string, @Body() newsToUpdate: UpdateNewsDto): Promise<News> {
    try {
      return await this.newsService.update1News(+news_id, newsToUpdate);
    }
    catch (error) {
      throw new HttpException('Echec de la modification', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({summary:"supppression de toute les actualités"})
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

  @ApiOperation({summary:"supppression d'une actualité"})
  @Delete('delete/:news_id')
  async delelete1News(@Param('news_id') news_id: string): Promise <HttpStatus> {
    try {
      const newsDeleted = await this.newsService.deleteOneNews(+news_id);
      if (newsDeleted) {
        return HttpStatus.NO_CONTENT;
      }
    }
    catch (error) {
      throw new HttpException('News not deleted', HttpStatus.BAD_REQUEST)
    }
  }

  @ApiOperation({summary:"récuperer toutes les actualités"})
  @Public()
  @Get('list')
  async findAll(): Promise<News[] | { HttpStatut: HttpStatus, message: string }> {
    try {
      const newsList = await this.newsService.findAll(); //console.log(newsList);
      if (newsList.length != 0) {
        return newsList;
      }
      else {
        return { HttpStatut: HttpStatus.NO_CONTENT, message: "Aucun contenu" };
      }
    }
    catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({summary:"récupérer une actualité"})
  @Public()
  @Get('id/:news_id')
  async findOneNews(@Param('news_id') news_id: string): Promise<News | HttpStatus> {
    try {
      const newsFound = await this.newsService.findOneNews(+news_id);
      if (newsFound === null) {
        return HttpStatus.NOT_FOUND;
      }
      return newsFound;
    }
    catch (error) {
      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
