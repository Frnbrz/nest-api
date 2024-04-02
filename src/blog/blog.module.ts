import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { BlogController } from './blog.controller'
import { BlogService } from './blog.service'
import { Blog } from './entities/blog.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AuthModule],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [TypeOrmModule]
})
export class BlogModule { }
