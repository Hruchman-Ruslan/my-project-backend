import { ExpressRequest } from '@app/types/expressRequest.interface';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';
import { JwtUserPayload } from '@app/types/jwtUserPayload.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    if (!jwtSecret)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    try {
      const decoded = verify(token, jwtSecret) as JwtUserPayload;
      const user = await this.userService.findById(decoded.id);
      req.user = user;
    } catch {
      req.user = null;
    }

    next();
  }
}
