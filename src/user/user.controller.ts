import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';

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
}
