import {
  IsString,
  MinLength
} from 'class-validator'

export class CreateBlogDto {

  @IsString()
  @MinLength(1)
  name: string

  @IsString()
  @MinLength(1)
  text: string

}
