
import {
  IsString,
  MinLength
} from 'class-validator'

export class UpdateBlogDto {

  @IsString()
  @MinLength(1)
  name?: string

  @IsString()
  @MinLength(1)
  text?: string

}
