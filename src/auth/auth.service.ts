import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) { }

  async hashPassword(password: string) :Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async createToken(payload: { sub: number, role: string }, secret: string, expiresIn: string): Promise<string> {
    return this.jwtService.signAsync(payload, { secret, expiresIn })
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<Users> {
    return this.prisma.users.update({
      where: {
        id
      },
      data: {
        refreshToken
      }
    })
  }

  async comparePwd(pwd: string, hashedPwd: string): Promise<Boolean> {
    return await bcrypt.compare(pwd, hashedPwd)
  }

  async pickUpRefreshTokenById(user_id: number): Promise<{ refreshToken: string }> {
    return await this.prisma.users.findUnique({ where: { id: user_id }, select: { refreshToken: true } })
  }

}
