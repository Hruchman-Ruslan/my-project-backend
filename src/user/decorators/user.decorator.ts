import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { UserEntity } from '@app/user/user.entity';

export const User = createParamDecorator(
  <T extends keyof UserEntity>(
    data: T | undefined,
    ctx: ExecutionContext,
  ): UserEntity[T] | UserEntity | null => {
    const request = ctx.switchToHttp().getRequest<ExpressRequest>();

    if (!request.user) {
      return null;
    }

    return data ? request.user[data] : request.user;
  },
);
