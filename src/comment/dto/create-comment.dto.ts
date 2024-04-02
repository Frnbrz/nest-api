import { IsNumber, IsString, MaxLength, MinLength } from "class-validator"

export class CreateCommentDto {

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string

  @IsNumber()
  blogId: number

}

