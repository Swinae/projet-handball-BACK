import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, PrismaModule, JwtModule.register({global: true})],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
