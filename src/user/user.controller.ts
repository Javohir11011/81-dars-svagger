import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiBody({ type: CreateUserDto, description: 'Information enter requred' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Registration failed',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  // @Api
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'User successfully login',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBody({ type: UpdateUserDto, description: 'Information enter requred' })
  async login(data: UpdateUserDto) {
    return this.userService.login(data);
  }
}
