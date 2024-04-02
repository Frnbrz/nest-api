import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ActiveUser } from 'src/common/decorators/active-user.decoraator'
import { Role } from 'src/common/enums/rol.enum'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { AuthService } from './auth.service'
import { Roles } from './decorators/roles.decorators'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthGuard } from './guard/auth.guard'
import { RolesGuard } from './guard/roles.guard'


interface RequestWithUser extends Request {
  user: {
    email: string
    role: string
  }
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }


  @Post('login')
  async login(
    @Body()
    loginDto: LoginDto,

  ) {
    return await this.authService.login(loginDto)
  }

  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return await this.authService.register(registerDto)
  }
  @Get('profile')
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  async profile(@ActiveUser() user: UserActiveInterface) {
    return await this.authService.profile(user)
  }

}
