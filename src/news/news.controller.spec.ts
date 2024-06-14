import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { customRequest } from 'src/utils/Interfaces/CustomRequest';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('NewsController', () => {
  //initialize two variables
  let controller: NewsController;
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [{
        provide: NewsService,
        useValue: {
          create: jest.fn(),
          update1News: jest.fn(),
          deleteOneNews: jest.fn(),
          findAll: jest.fn(),
          findOneNews: jest.fn()
        }
      }, PrismaService, JwtService],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = module.get<NewsService>(NewsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  //case a news is valid
  describe('/create : case a news is valid', () => {
    it("should return a News Object'", async () => {
      //initialise a mockNews
      const mockNews = {
        id: 2,
        title: "Web 1",
        content: "Description du web 2 kjjcbbcsdcsdcbds",
        img: "string",
        created_at: new Date("2024-05-23T14:01:31.178Z"),
        updated_at: new Date("2024-05-23T14:01:31.178Z"),
        creator_id: 1
      }

      //initialise news OF user
      const newsUser = {
        title: "cjndscjkjcdsjcjcnsdjcssdnjcn",
        content: "Akcfnzdjcnjdjcnjcjcjjeed"
      }

      // initialise a customRequest
      const mockRequest: customRequest = {
        user: {
          sub: 1, // ou tout autre valeur simulée pour l'identifiant de l'administrateur
          role: "ADMIN", // ou tout autre rôle simulé
          refreshToken: "example_refresh_token" // ou tout autre jeton de rafraîchissement simulé
        },
        cache: 'default',
        credentials: 'include',
        destination: '',
        headers: undefined,
        integrity: '',
        keepalive: false,
        method: '',
        mode: 'same-origin',
        redirect: 'error',
        referrer: '',
        referrerPolicy: '',
        signal: undefined,
        url: '',
        clone: function (): Request {
          throw new Error('Function not implemented.');
        },
        body: undefined,
        bodyUsed: false,
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error('Function not implemented.');
        },
        blob: function (): Promise<Blob> {
          throw new Error('Function not implemented.');
        },
        formData: function (): Promise<FormData> {
          throw new Error('Function not implemented.');
        },
        json: function (): Promise<any> {
          throw new Error('Function not implemented.');
        },
        text: function (): Promise<string> {
          throw new Error('Function not implemented.');
        }
      };

      //spy service and mock a value
      jest.spyOn(service, "create").mockResolvedValue(mockNews);

      expect(await controller.create(newsUser, mockRequest)).toEqual(mockNews);

    })
  });

  //case a news is not valid
  describe("/create : case a news is not valid", () => {
    it("should return a HttpExeption", async () => {
      // initialise a customRequest
      const mockRequest: customRequest = {
        user: {
          sub: 1, // ou tout autre valeur simulée pour l'identifiant de l'administrateur
          role: "ADMIN", // ou tout autre rôle simulé
          refreshToken: "example_refresh_token" // ou tout autre jeton de rafraîchissement simulé
        },
        cache: 'default',
        credentials: 'include',
        destination: '',
        headers: undefined,
        integrity: '',
        keepalive: false,
        method: '',
        mode: 'same-origin',
        redirect: 'error',
        referrer: '',
        referrerPolicy: '',
        signal: undefined,
        url: '',
        clone: function (): Request {
          throw new Error('Function not implemented.');
        },
        body: undefined,
        bodyUsed: false,
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error('Function not implemented.');
        },
        blob: function (): Promise<Blob> {
          throw new Error('Function not implemented.');
        },
        formData: function (): Promise<FormData> {
          throw new Error('Function not implemented.');
        },
        json: function (): Promise<any> {
          throw new Error('Function not implemented.');
        },
        text: function (): Promise<string> {
          throw new Error('Function not implemented.');
        }
      };

      //initialise news OF user
      const newsUser = {
        title: "cjndscjkjcdsjcjcnsdjcssdnjcn",
        content: "ldcnjndjcn",
      }

      jest.spyOn(service, "create").mockRejectedValue(HttpException);

      try {
        expect(await controller.create(newsUser, mockRequest));
      }
      catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Actualité non crée !');
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      }

      expect(service.create).toHaveBeenCalledWith(newsUser, mockRequest.user.sub);
    })
  })
});
