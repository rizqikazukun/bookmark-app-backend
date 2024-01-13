import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(user: any) {
    try {
      const usr = await this.prisma.user.findUnique({
        where: {
          id: user.sub,
        },
      });

      if (!usr) {
        throw new NotFoundException('User is not registered');
      }

      delete usr.password;
      return usr;
    } catch (error) {
      throw error;
    }
  }

  async editUser(user: any, dto: UsersDto) {
    try {
      if (Object.keys(dto).length === 0) {
        throw new BadRequestException('No Body Provide');
      }

      const update = await this.prisma.user.update({
        data: {
          ...dto,
        },
        where: {
          id: user.sub,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated',
        data: update,
      };
    } catch (error) {
      throw error;
    }
  }
}
