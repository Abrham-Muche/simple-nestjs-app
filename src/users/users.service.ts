import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { isEmail, isUUID } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    try {
      payload.email = payload.email;
      payload.password = await this.hashPassword(payload.password);
      const emailUsed = await this.emailExists(payload.email);
      if (emailUsed) {
        throw new BadRequestException('Email already in use');
      }
      const newUser = await this.userRepository.create(payload as any);
      const { password: ignoredProp, ...user } = newUser['dataValues'];
      return user;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async getUserById(userId?: string): Promise<User> {
    if (!isUUID(userId)) {
      throw new BadRequestException(
        'User id is required and should be a valid uuid',
      );
    }
    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = undefined;
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    if (!isEmail(email)) {
      throw new BadRequestException('Invalid email');
    }
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  private async emailExists(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }
  private async hashPassword(password) {
    const h = await hash(password, 10);
    return h;
  }
}
