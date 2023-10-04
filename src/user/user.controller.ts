import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(userDto);
      return user;
    } catch (error) {
      throw new Error('Custom error message for create user');
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (error) {
      throw new Error('Custom error message for get user by ID');
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error) {
      throw new Error('Custom error message for get all users');
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userDto: CreateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.updateUser(id, userDto);
      return user;
    } catch (error) {
      throw new Error('Custom error message for update user');
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<void> {
    try {
      await this.userService.deleteUserById(id);
    } catch (error) {
      throw new Error('Custom error message for delete user');
    }
  }
}
