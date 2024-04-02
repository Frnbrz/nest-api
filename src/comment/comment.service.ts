import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Blog } from 'src/blog/entities/blog.entity'
import { Role } from 'src/common/enums/rol.enum'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>
  ) { }

  async create(createCommentDto: CreateCommentDto, user: UserActiveInterface) {
    const blog = await this.blogRepository.findBy({ id: createCommentDto.blogId })

    if (blog.length === 0) throw new BadRequestException('Blog not found')

    return await this.commentRepository.save({
      ...createCommentDto,
      userEmail: user.email
    })
  }

  async findAll(user: UserActiveInterface) {
    return await this.commentRepository.find({
      where: {
        userEmail: user.email
      }
    })
  }

  async findOne(id: number, user: UserActiveInterface) {
    const comment = await this.commentRepository.findOneBy({ id })
    if (!comment) {
      throw new BadRequestException('Comment not found')
    }
    this.validateOwnership(comment, user)
    return comment
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: UserActiveInterface) {

    await this.findOne(id, user)

    return this.commentRepository.update(id, {
      ...updateCommentDto,
      userEmail: user.email
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user)
    return this.commentRepository.delete(id)
  }

  private validateOwnership(comment: Comment, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && comment.userEmail !== user.email) {
      throw new UnauthorizedException()
    }
  }

}
