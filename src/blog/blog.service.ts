import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface'
import { Repository } from 'typeorm'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { Blog } from './entities/blog.entity'

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,


  ) { }

  async create(createBlogDto: CreateBlogDto, user: UserActiveInterface) {
    return await this.blogRepository.save({
      ...createBlogDto,
      userEmail: user.email
    })
  }

  async findAll() {
    return await this.blogRepository.find()
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOneBy({ id })
    if (!blog) throw new BadRequestException('Blog not found')
    return blog
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    await this.findOne(id)
    return await this.blogRepository.update(id, updateBlogDto)
  }

  async remove(id: number) {
    const blog = await this.findOne(id)
    return await this.blogRepository.remove(blog)
  }
}


