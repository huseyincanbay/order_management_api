import { IsNotEmpty, IsNumber, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
