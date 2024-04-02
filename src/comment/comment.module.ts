import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { BlogModule } from 'src/blog/blog.module'
import { BlogService } from 'src/blog/blog.service'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { Comment } from './entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BlogModule, AuthModule],
  controllers: [CommentController],
  providers: [CommentService, BlogService],
})
export class CommentModule { }
