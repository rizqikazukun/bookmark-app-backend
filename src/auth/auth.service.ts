import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): any {
    return {
      status: 200,
      message: 'login success',
    };
  }

  register(): any {}
}
