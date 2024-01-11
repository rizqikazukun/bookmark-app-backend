import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(): any {
    return this.authService.login();
  }

  @Post('register')
  register(@Body() dto: AuthDto): any {
    return this.authService.register(dto);
  }
}
