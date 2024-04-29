import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('signup')
    async create(@Body() body: CreateUserDto) {
        try {
            // Check if user exist in DB
            const foundUser = await this.userService.findByEmail(body.email)

            // Si email éxiste, on lance une exeption
            if (foundUser) {
                throw new HttpException('Email already exist', HttpStatus.FORBIDDEN)
            }

            // Sinon, on créé le user
            body.password = await this.authService.hashPassword(body.password)
            const newUser = await this.userService.create(body)

            // Create tokens
            const token = await this.authService.createToken({ sub: newUser.id, role: newUser.role }, process.env.SECRET_KEY, process.env.TOKEN_DURATION)
            const refreshToken = await this.authService.createToken({ sub: newUser.id, role: newUser.role }, process.env.SECRET_REFRESH_KEY, process.env.REFRESH_TOKEN_DURATION)

            // Add refresh token to DB
            const user = this.authService.updateRefreshToken(newUser.id, refreshToken)

            // Return info to the front
            return { user, token, refreshToken }

        } catch (error) {
            return error
        }
    }
}
