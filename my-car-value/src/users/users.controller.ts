import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common'

import { UserDto } from './dtos/user.dto'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UsersService } from './users.service'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { AuthService } from './auth.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.authService.signup(body.email, body.password)
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) throw new NotFoundException('Not found this user')
    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(parseInt(id), body)
  }
}
