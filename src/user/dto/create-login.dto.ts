import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email should be inputted',
    example: 'example@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
