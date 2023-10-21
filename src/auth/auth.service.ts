import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth-entities';
import { AuthDto } from './dto/auth-dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(authDto: AuthDto): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authDto.password, salt);

    const newUser = this.authRepository.create({
      email: authDto.email,
      password: hashedPassword,
    });

    await this.authRepository.save(newUser);

    return this.createToken(newUser.email);
  }

  async createToken(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
