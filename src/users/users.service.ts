import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
