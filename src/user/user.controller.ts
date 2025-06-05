import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.signUp(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('sign-in')
  async signIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.signIn(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getCurrentUser(@User() user: UserEntity): UserResponseInterface {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );

    return this.userService.buildUserResponse(user);
  }
}
