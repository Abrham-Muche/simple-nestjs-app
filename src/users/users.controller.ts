import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import JwtAuthenticationGuard from 'src/auth/jwtAuthentication.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'create a user' })
  @ApiResponse({
    type: UserResponseDto,
    status: 201,
  })
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':userId')
  @ApiParam({ name: 'userId' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({
    type: UserResponseDto,
    status: 200,
  })
  getUserById(@Param() params): Promise<User> {
    return this.userService.getUserById(params.userId);
  }
}
