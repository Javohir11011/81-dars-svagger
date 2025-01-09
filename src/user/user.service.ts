import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { comparePassword, generateHash } from '../helpers/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const currentUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (currentUser) {
      return null;
    }
    const hashPass = await generateHash(createUserDto.password);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashPass,
    });
    await newUser.save();
    const userObject = newUser.toObject();
    delete userObject.password;
    return userObject;
  }

  async login(loginUser: UpdateUserDto) {
    const currentUser = await this.userModel.findOne({
      email: loginUser.email,
    });
    if (currentUser?.password !== loginUser.email) {
      throw new UnauthorizedException();
    }
    if (!currentUser) {
      return { message: 'User not Found' };
    }
    const compareUser = await comparePassword(
      loginUser.password,
      currentUser.password,
    );
    if (!compareUser) {
      return { message: 'Password or email ' };
    }
    const user = await this.userModel.findOne({ email: loginUser.email });
    if (user?.password !== loginUser.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
