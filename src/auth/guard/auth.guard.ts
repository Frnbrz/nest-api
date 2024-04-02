import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Role } from 'src/common/enums/rol.enum'
import { jwtConstants } from '../constants/jwt.constant'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(

    private readonly jwtService: JwtService,
  ) { }


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {



    const request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)

    if (!token) throw new UnauthorizedException('token not found')


    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      request[Role.USER] = payload
    }
    catch (error) {
      throw new UnauthorizedException('invalid token')
    }
    return true
  }

  private extractToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
