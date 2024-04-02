import { Transform } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterDto {

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  name: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  password: string

  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string
}