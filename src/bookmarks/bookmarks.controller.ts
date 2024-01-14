import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser() user: any, @Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.create(user, createBookmarkDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser() user: any) {
    return this.bookmarksService.findAll(user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@GetUser() user: any, @Param('id') id: string) {
    return this.bookmarksService.findOne(user, +id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @GetUser() user: any,
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarksService.update(user, +id, updateBookmarkDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@GetUser() user: any, @Param('id') id: string) {
    return this.bookmarksService.remove(user, +id);
  }
}
