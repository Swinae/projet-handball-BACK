import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../../src/user/user.service';
import { SignUpSupporterAuthDto } from './dto/signUp-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenGuard } from '../middleware/guards/RefreshToken.guard';
import { customRequest } from '../../src/utils/interfaces/CustomRequest';
import { Users } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post('signup')
  async signup(@Body() body: SignUpSupporterAuthDto):Promise<{user:Users,token:string, refreshToken:string} | HttpException> {
    try {
      // Check if user exist in DB
      const foundUser = await this.userService.findByEmail(body.email)

      // Si email éxiste, on lance une exeption
      if (foundUser) {
        throw new HttpException('Email already exist', HttpStatus.FORBIDDEN)
      }

      // Sinon, on hash le password
      body.password = await this.authService.hashPassword(body.password)

      //on créé le user
      const newUser = await this.userService.createSupporter(body)

      // Create and update tokens
      return this.__createAndUpdateTokens(newUser.id, newUser.role)

    } catch (error) {
      throw error
    }
  }

  @Post('login')
  async login(@Body() body: LoginAuthDto): Promise<{ user: Users, token: string, refreshToken: string } | HttpException> {
    try {
      // Check if user exist in DB
      const foundUser = await this.userService.findByEmail(body.email)

      // If user mail not in DB, throw an error
      if (!foundUser) {
        throw new HttpException('Email does not correspond to an existing account', HttpStatus.FORBIDDEN)
      }

      // If passwords don't match, throw an error
      if (!await this.authService.comparePwd(body.password, foundUser.password)) {
        throw new HttpException('Wrong password', HttpStatus.FORBIDDEN)
      }

      // Create and update tokens
      return this.__createAndUpdateTokens(foundUser.id, foundUser.role)

    } catch (error) {
      throw error
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refreshToken')
  async refreshToken(@Request() req: customRequest): Promise<{ user: Users, token: string, refreshToken: string }> {
    try {
      //pick_up refreshToken into db by id
      const refreshTokenIntoObject = await this.authService.pickUpRefreshTokenById(req.user.sub);

      //check user.refreshToken === refreshToken
      if (refreshTokenIntoObject.refreshToken === req.user.refreshToken) {

        //create tokens and update refreshToken in db
        return this.__createAndUpdateTokens(req.user.sub, req.user.role);
      }
      else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    catch (error) {
      throw error;
    }
  }

  private async __createAndUpdateTokens(id: number, role: string) {
    // Create tokens
    const token = await this.authService.createToken({ sub: id, role: role }, process.env.SECRET_KEY, process.env.TOKEN_DURATION)
    const refreshToken = await this.authService.createToken({ sub: id, role: role }, process.env.SECRET_REFRESH_KEY, process.env.REFRESH_TOKEN_DURATION)

    // Add refresh token to DB
    const user = await this.authService.updateRefreshToken(id, refreshToken)

    // Return into to the front
    return { user, token, refreshToken }
  }
}
