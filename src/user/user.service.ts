import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    user.email = userDto.email;

    return this.userRepository.save(user);
  }
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateUser(id: number, userDto: CreateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    user.username = userDto.username;
    user.password = userDto.password;
    user.email = userDto.email;

    return this.userRepository.save(user);
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }
}
