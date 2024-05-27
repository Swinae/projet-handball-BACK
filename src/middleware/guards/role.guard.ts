import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.SECRET_KEY
                }
            );

            request['user'] = payload;

            const role = request.user.role
            console.log(request.user)
            
            if (role !== 'ADMIN') {
                throw new UnauthorizedException()
            }

        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}