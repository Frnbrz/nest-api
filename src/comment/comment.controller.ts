import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/decorators/roles.decorators'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { ActiveUser } from 'src/common/decorators/active-user.decoraator'
import { Role } from 'src/common/enums/rol.enum'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'


@ApiBearerAuth()
@ApiTags('comment')
@Controller('comment')
@Roles(Role.USER)
@UseGuards(AuthGuard, RolesGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @ActiveUser() user: UserActiveInterface) {
    return this.commentService.create(createCommentDto, user)
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.commentService.findAll(user)
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.commentService.findOne(id, user)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @ActiveUser() user: UserActiveInterface) {
    return this.commentService.update(id, updateCommentDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.commentService.remove(id, user)
  }
}
