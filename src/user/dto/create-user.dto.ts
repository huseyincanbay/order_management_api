import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
