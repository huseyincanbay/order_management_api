import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly password: string;
}
