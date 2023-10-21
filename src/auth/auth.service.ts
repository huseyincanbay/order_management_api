import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth-entities';
import { AuthDto } from './dto/auth-dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './strategy/jwt-config';

@Injectable()
export class AuthService {
  private readonly tokenExpiration = jwtConfig.expiresIn;
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

    const existingUser = await this.authRepository.findOneBy({
      email: authDto.email,
    });
    if (existingUser) {
      throw new UnauthorizedException('Email is already registered!');
    }

    await this.authRepository.save(newUser);

    return this.createToken(newUser.email);
  }

  async login(authDto: AuthDto) {
    const existUser = await this.authRepository.findOneBy({
      email: authDto.email,
    });
    if (!existUser) {
      throw new UnauthorizedException('Email is wrong!');
    }
    const isMatch = await bcrypt.compare(authDto.password, existUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password is wrong!');
    }
    return 'You are now authenticated!';
  }

  async createToken(email: string): Promise<string> {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.tokenExpiration,
    });
    return token;
  }
}
