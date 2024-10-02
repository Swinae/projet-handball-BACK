import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Match } from '@prisma/client';

@Injectable()
export class MatchService {
  
  constructor(private readonly prisma: PrismaService) { }
  
  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  async findAll() :Promise<Match[]> {
    return this.prisma.match.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
