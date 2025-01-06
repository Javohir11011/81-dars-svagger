import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { comparePassword, generateHash } from './helpers/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}
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
    // return `This action returns all user`;
    const currentUser = await this.userModel.findOne({
      email: loginUser.email,
    });
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
    return {
      message: 'login success',
      user: { id: currentUser._id, email: currentUser.email },
    };
  }
}
