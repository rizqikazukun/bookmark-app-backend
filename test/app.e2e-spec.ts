import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { LoginDto, RegisterDto } from '../src/auth/dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersDto } from 'src/users/dto';
import { CreateBookmarkDto, UpdateBookmarkDto } from 'src/bookmarks/dto';

describe('App-e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let config: ConfigService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(9000);

    prisma = await app.get(PrismaService);
    await prisma.cleanDb();
    config = new ConfigService();
    pactum.request.setBaseUrl(config.get('APP_URL'));
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Register', () => {
      it('should register', () => {
        const dto: RegisterDto = {
          first_name: 'new',
          last_name: 'user',
          email: 'user@example.com',
          password: 'good-password',
        };
        return pactum
          .spec()
          .post('/user/register')
          .withBody(dto)
          .expectStatus(201);
      });

      it('should throw error if email empty', () => {
        const dto: RegisterDto = {
          first_name: 'new',
          last_name: 'user',
          email: '',
          password: 'good-password',
        };
        return pactum
          .spec()
          .post('/user/register')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw error if password empty', () => {
        const dto: RegisterDto = {
          first_name: 'new',
          last_name: 'user',
          email: 'user@example.com',
          password: '',
        };
        return pactum
          .spec()
          .post('/user/register')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw error if no body provide', () => {
        return pactum.spec().post('/user/register').expectStatus(400);
      });
    });

    describe('Login', () => {
      it('should login', () => {
        const dto: LoginDto = {
          email: 'user@example.com',
          password: 'good-password',
        };
        return pactum
          .spec()
          .post('/user/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('accessToken', 'accessToken');
      });

      it('should throw error if email empty', () => {
        const dto: LoginDto = {
          email: '',
          password: 'good-password',
        };
        return pactum
          .spec()
          .post('/user/login')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw error if password empty', () => {
        const dto: LoginDto = {
          email: 'user@example.com',
          password: '',
        };
        return pactum
          .spec()
          .post('/user/login')
          .withBody(dto)
          .expectStatus(400);
      });

      it('should throw error if no body provide', () => {
        return pactum.spec().post('/user/login').expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get Me', () => {
      it('should be get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });

      it('should throw auth error', () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });
    });
    describe('Edit User', () => {
      it('should be updated', () => {
        const dto: UsersDto = {
          first_name: 'Daniel',
          last_name: 'Santoso',
        };

        return pactum
          .spec()
          .patch('/users/me')
          .withBody(dto)
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });

      it('should throw auth error', () => {
        const dto: UsersDto = {
          first_name: 'Daniel',
          last_name: 'Santoso',
        };

        return pactum.spec().patch('/users/me').withBody(dto).expectStatus(401);
      });

      it('should throw no body provide', () => {
        return pactum
          .spec()
          .patch('/users/me')
          .withBearerToken('$S{accessToken}')
          .expectStatus(400);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Get Bookmarks', () => {
      it('should be throw error 404', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withBearerToken('$S{accessToken}')
          .expectStatus(404);
      });
    });

    describe('Create Bookmark', () => {
      it('should create new bookmark', () => {
        const dto: CreateBookmarkDto = {
          title: 'How to use query parameters in Nest.js?',
          link: 'https://stackoverflow.com/questions/54958244/how-to-use-query-parameters-in-nest-js',
        };

        return pactum
          .spec()
          .post('/bookmarks')
          .withBody(dto)
          .withBearerToken('$S{accessToken}')
          .expectStatus(201)
          .stores('bookmarkId', 'data.id');
      });
    });

    describe('Get Bookmark by id', () => {
      it('should be get one by bookmark id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });
    });

    describe('Edit Bookmark', () => {
      it('should update bookmark', () => {
        const dto: UpdateBookmarkDto = {
          description: 'Solving querry problem on nest js',
        };

        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBody(dto)
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });
    });

    describe('Delete Bookmark', () => {
      it('should delete bookmark', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });
    });
  });
});
