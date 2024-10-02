import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../../../src/customsDecorators/publicDecorator';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {

      // 💡 See this condition 
      return true;
    }

    const request = context.switchToHttp().getRequest(); //console.log("request: ",request);
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {//check token valid?
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.SECRET_KEY
        }
      );

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      request['user_id'] = payload.sub;

      //check payload.role === ADMIN
      if (payload.role !== "ADMIN") {
        throw new UnauthorizedException();
      }

    }
    catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException("Token expired");
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log("type: ", type, " token: ", token)
    return type === 'Bearer' ? token : undefined;
  }
}