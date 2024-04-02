import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email })
  }

  async findbyEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findOne(
      { where: { email }, select: ['id', 'name', 'email', 'password', 'role'] }
    )
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
