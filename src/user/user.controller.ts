import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from '@prisma/client';
import { CreateAdmin } from './dto/create-admin.dto';
import { AuthService } from '../../src/auth/auth.service';
import { AdminAuthGuard } from '../../src/middleware/guards/Admin-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @UseGuards(AdminAuthGuard)
  @Post("create/administrator")
  async createAdministrator(@Body() body: CreateAdmin): Promise<{userCreated:Users, token:string, refreshToken:string}> {
    //check body.email exist
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new HttpException('Bad request!', HttpStatus.BAD_REQUEST);
    }

    //add a tempory pwd to administrator
    body.password = process.env.ADMIN_PWD;

    //hashed pwd
    body.password = await this.authService.hashPassword(body.password)

    //add role ADMIN to administrator
    body.role = "ADMIN";

    //create administrator
    const userCreated = await this.userService.createAdmin(body);

    //send email or create tokens
    const { token, refreshToken } = await this.__createAndUpdateTokens(userCreated.id, userCreated.role);

    //assign refreshToken into userCreated
    userCreated.refreshToken = refreshToken;

    //update refreshtoken in table users in db
    await this.authService.updateRefreshToken(userCreated.id, refreshToken)

    // return success {userCreated, token, refreshtoken}
    return { userCreated, token, refreshToken };
  }

  /*   @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(+id);
    } */
   private async __createAndUpdateTokens(id: number, role: string) {
    // Create tokens
    const token = await this.authService.createToken({ sub: id, role: role }, process.env.SECRET_KEY, process.env.TOKEN_DURATION)
    const refreshToken = await this.authService.createToken({ sub: id, role: role }, process.env.SECRET_REFRESH_KEY, process.env.REFRESH_TOKEN_DURATION)

    // Add refresh token to DB
    const user = await this.authService.updateRefreshToken(id, refreshToken)

    // Return info to the front
    return { user, token, refreshToken }
  }
}
