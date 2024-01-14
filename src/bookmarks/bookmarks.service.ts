import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async create(user: any, createBookmarkDto: CreateBookmarkDto) {
    try {
      const created = await this.prisma.bookmark.create({
        data: {
          user_id: user.sub,
          ...createBookmarkDto,
        },
        select: {
          id: true,
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Created',
        data: created,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(user: any) {
    try {
      const findAll = await this.prisma.bookmark.findMany({
        where: {
          user_id: user.sub,
        },
      });

      if (findAll.length === 0) {
        throw new NotFoundException('Bookmark Not Found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'ok',
        data: findAll,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(user: any, id: number) {
    try {
      const find = await this.prisma.bookmark.findFirst({
        where: {
          id,
          user_id: user.sub,
        },
      });

      if (!find) {
        throw new NotFoundException('Bookmark Not Found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'ok',
        data: find,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(user: any, id: number, updateBookmarkDto: UpdateBookmarkDto) {
    try {
      const upd = await this.prisma.bookmark.update({
        where: {
          id,
          user_id: user.sub,
        },
        data: {
          ...updateBookmarkDto,
        },
        select: {
          id: true,
        },
      });

      if (!upd) {
        throw new NotFoundException('Bookmark Not Found');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'ok',
        data: upd,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(user: any, id: number) {
    try {
      await this.prisma.bookmark.delete({
        where: {
          id,
          user_id: user.sub,
        },
      });

      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'deleted',
      };
    } catch (error) {
      throw error;
    }
  }
}
