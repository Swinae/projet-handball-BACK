import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { EventModule } from './event/event.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [AuthModule, UserModule, NewsModule, EventModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
