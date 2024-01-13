import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UsersService } from './users.service';
import { UsersDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@GetUser() user: any) {
    return this.userService.getMe(user);
  }

  @UseGuards(JwtGuard)
  @HttpCode(200)
  @Patch('me')
  patchMe(@GetUser() user: any, @Body() dto: UsersDto) {
    return this.userService.editUser(user, dto);
  }
}
