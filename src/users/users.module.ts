import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
