import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async createSupporter(data: CreateUserDto): Promise<Users> {
    return this.prisma.users.create({ data });
  }

  findAll() {
    return `This action returns all user`;
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email
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
