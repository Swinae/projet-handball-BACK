import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Users } from '@prisma/client';
import { CreateAdmin } from './dto/create-admin.dto';
import { SignUpSupporterAuthDto } from 'src/auth/dto/signUp-auth.dto';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async createAdmin(data: CreateAdmin): Promise<Users> {
    return this.prisma.users.create({ data });
  }

  async createSupporter(data: SignUpSupporterAuthDto): Promise<Users> {
    return await this.prisma.users.create({ data });
  }

  findAll() {
    return `This action returns all user`;
  }

  findByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        email
      }
    });
  }

  findById(id: number): Promise<Users> {
    return this.prisma.users.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
