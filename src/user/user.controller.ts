import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { ExpressRequest } from '@app/types/expressRequest.interface';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.signUp(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('signIn')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.signIn(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async getCurrentUser(
    @Req() request: ExpressRequest,
  ): Promise<UserResponseInterface> {
    if (!request.user)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); // improve later

    return this.userService.buildUserResponse(request.user);
  }
}
