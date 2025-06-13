import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { CloudinaryModule } from '@app/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CloudinaryModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
