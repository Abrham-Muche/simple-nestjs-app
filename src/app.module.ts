import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
    forwardRef(() => DatabaseModule),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
