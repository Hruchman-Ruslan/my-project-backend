import { CreateUserDto } from '@app/users/dto/createUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }
}
