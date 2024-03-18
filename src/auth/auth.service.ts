import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInPayloadDto } from './dto/signInPayload.dto';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async matchPassword(password, storedPassword) {
    const match = await compare(password, storedPassword);
    return match;
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    const userProps = user['dataValues'];
    if (!user) {
      return null;
    }
    const match = await this.matchPassword(password, user.password);
    if (!match) {
      return null;
    }
    const { password: ignoredProp, ...visibleProps } = userProps;
    return visibleProps;
  }

  public async signIn(payload: SignInPayloadDto) {
    const { email, password } = payload;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    const token = await this.getUserToken(user);
    return token;
  }
  public async getUserToken(user) {
    const jwt = await this.generateToken(user);
    return jwt;
  }

  private async generateToken(user) {
    const payload = {
      userId: user.userid,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return { jwt: token };
  }
}
