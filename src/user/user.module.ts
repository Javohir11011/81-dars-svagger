import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constans/jwt.constans';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.access.secret,
      signOptions: { expiresIn: jwtConstants.access.expiresIn },
    }),

    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
