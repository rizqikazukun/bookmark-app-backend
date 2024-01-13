import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new NotFoundException('Email is not registered');
      }

      const passwordMatch = await argon.verify(user.password, dto.password);

      if (!passwordMatch) {
        throw new BadRequestException('Wrong password');
      }

      interface Payload {
        sub: number;
        email: string;
      }

      const payload: Payload = {
        sub: user.id,
        email: user.email,
      };

      return {
        statusCode: 200,
        message: 'Login Success',
        accessToken: await this.jwtService.signAsync(payload, {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: '15m',
        }),
        // refreshToken: '',
      };
    } catch (error) {
      throw error;
    }
  }

  async register(dto: RegisterDto) {
    try {
      const hash: string = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          email: dto.email,
          password: hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already registered');
        }
      }
      throw error;
    }
  }
}
