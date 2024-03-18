import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthenticationGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  constructor() {
    super();
  }

  /**
   *
   *
   * @param err
   * @param user
   * @param info
   */
  public override handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new UnauthorizedException('Session expired');
    }
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    await super.canActivate(context);
    if (!request.user) {
      return false;
    }

    return true;
  }
}
