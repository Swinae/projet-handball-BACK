import { Test } from "@nestjs/testing";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../src/user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRoleEnum, Users } from "@prisma/client";
import { HttpException } from "@nestjs/common";

describe('authController', () => {
  //define variables
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  // faker
  let mockUser: Users = {
    id: 1,
    firstname: "john",
    lastname: "doe",
    email: "john.doe@hotmail.com",
    password: "azerty01++",
    phone_number: "0568744515",
    role: UserRoleEnum.ADMIN,
    avatar: "",
    description: "Akklndnndnnsodzonezdonednz",
    last_connected: new Date("2024-05-23T14:01:31.178Z"),
    refreshToken: "azertyuiop^",
    created_at: new Date("2024-05-23T14:01:31.178Z"),
    updated_at: new Date("2024-05-23T14:01:31.178Z")
  };

  //fake register data
  const dataRegister = {
    email: "john.doe@hotmail.com",
    password: "Azerty01"
  }

  //before each test instance a module and instance controllers and providers
  beforeEach(async () => {
    //instance a module
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: {
          hashPassword: jest.fn(),
          createToken: jest.fn(),
          updateRefreshToken: jest.fn()
        }
      },
      {
        provide: UserService,
        useValue: {
          findByEmail: jest.fn(),
          createSupporter: jest.fn()
        }
      },
        JwtService, PrismaService]
    }).compile();

    //instance controllers and providers
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
  })

  describe('signup', () => {
    //case user email not exist
    it('case: email not exist. should return a object with user, token, refresToken keys', async () => {

      //fake hashPassword
      const hashPassword = "wxcvbnqsdfg";

      //fake tokens
      const token = 'azertyuiop^';
      const refreshToken = 'azertyuiop^';

      //initialize a variable with except results by signup method
      const result = { user: { ...mockUser }, token, refreshToken };

      //spy services and mock a result
      //with jest spy findByEmail method of userService and simulate expect result
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(authService, 'hashPassword').mockResolvedValue(hashPassword);
      jest.spyOn(userService, 'createSupporter').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'createToken').mockResolvedValue(token);
      jest.spyOn(authService, 'updateRefreshToken').mockResolvedValue(mockUser);

      //check call signup method of authContoller return except result
      expect(await authController.signup(dataRegister)).toStrictEqual(result);
    });

    //case user email exist 
    it('case: email exist in db. should return httpExeption', async () => {
      //spy services and mock a result
      //with jest spy findByEmail method of userService and simulate expect result
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);

      //check call signup method of authContoller return except result
      await expect(authController.signup(dataRegister)).rejects.toThrow(HttpException);
    })
  })
})