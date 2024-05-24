import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshGuard } from './guards/refresh.guard';
import { RequestWithUser } from 'src/utils/interfaces/requests.interface';
import { Users } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('signup')
    async signup(@Body() body: SignUpAuthDto) {
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

            // Create and update tokens
            return this.__createAndUpdateTokens(newUser.id, newUser.role)

        } catch (error) {
            throw error
        }
    }


    @Post('login')
    async login(@Body() body: LoginAuthDto) {
        try {
            // Check if user exist in DB
            const foundUser = await this.userService.findByEmail(body.email)

            // If user mail not in DB, throw an error
            if (!foundUser) {
                throw new HttpException('Bad Credentials', HttpStatus.FORBIDDEN)
            }

            // If passwords don't match, throw an error
            if (!await this.authService.comparePwd(body.password, foundUser.password)) {
                throw new HttpException('Bad Credentials', HttpStatus.FORBIDDEN)
            }

            // Create and update tokens
            return this.__createAndUpdateTokens(foundUser.id, foundUser.role)

        } catch (error) {
            throw error
        }
    }


    @Post('refreshToken')
    @UseGuards(RefreshGuard)
    async refreshToken(@Req() req: RequestWithUser) {
        const user: Users = await this.userService.findById(req.user.sub) // sub = id du user dans le payload de la request (Cf fonction __createAndUpdatedTokens)
        
        if (user.refreshToken !== req.refreshToken) {
            throw new HttpException('Token expired', HttpStatus.FORBIDDEN)
        }

        return this.__createAndUpdateTokens(user.id, user.role)
    }

    private async __createAndUpdateTokens(id: number, role: string) {
        // Create tokens
        const token = await this.authService.createToken({ sub: id, role: role }, process.env.SECRET_KEY, process.env.TOKEN_DURATION)
        const refreshToken = await this.authService.createToken({ sub: id, role: role }, process.env.SECRET_REFRESH_KEY, process.env.REFRESH_TOKEN_DURATION)

        // Add refresh token to DB
        const user = this.authService.updateRefreshToken(id, refreshToken)

        // Return info to the front
        return { user, token, refreshToken }
    }
}
