import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(user: any) {
    const usr = await this.prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });

    delete usr.password;
    return usr;
  }
}
