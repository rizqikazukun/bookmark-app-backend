import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    interface Result {
      status: number;
      message: string;
    }

    const result: Result = {
      status: 200,
      message: 'ok',
    };

    return result;
  }
}
