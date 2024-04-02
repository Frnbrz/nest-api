import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(
    { email, password }: LoginDto
  ) {
    const user = await this.userService.findbyEmailWithPassword(email)
    if (!user) throw new UnauthorizedException('email is wrong')

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new UnauthorizedException('password is wrong')

    const payload = { email: user.email, role: user.role }
    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      email,
    }
  }

  async register({ name, email, password }: RegisterDto) {


    const user = await this.userService.findbyEmailWithPassword(email)

    if (user) throw new BadRequestException('User already exists')

    const cryptPassword = await bcrypt.hash(password, 10)
    await this.userService.create({
      name,
      email,
      password: cryptPassword,
    })
    const token = await this.jwtService.signAsync({ email, role: 'user' })

    return {
      token,
      email,
    }

  }

  async profile({ email, role }: { email: string, role: string }) {
    return await this.userService.findByEmail(email)
  }
}
