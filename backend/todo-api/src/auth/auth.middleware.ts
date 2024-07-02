import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService){}
  use(req: any, res: any, next: () => void) {

    const authHeader = req.headers.authorization;

    if(!authHeader){
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = this.jwtService.decode(token)

    req.user = decodedToken;

    next();
  }
}
