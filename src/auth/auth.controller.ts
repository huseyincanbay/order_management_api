import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() authDto: AuthDto): Promise<string> {
    return await this.authService.register(authDto);
  }

  @Post('/login')
  login() {}
}
