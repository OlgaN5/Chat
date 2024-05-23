import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaService } from '../src/prisma.service';
import { ValidationPipe } from '../src/validation/validation.pipe';
import { AllExceptionFilter } from '../src/filters/all-exeption.filter';
import { DatabaseExceptionFilter } from '../src/filters/database-exeption.filter';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';
import { ValidationExceptionFilter } from '../src/filters/validation-exception.filter';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [ValidationPipe]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionFilter(), new DatabaseExceptionFilter(), new HttpExceptionFilter(), new ValidationExceptionFilter)
    await app.init();
  });
  describe('register', () => {


    it('/ register user passes with valid data (Post)', async () => {
      const prismaService = app.get<PrismaService>(PrismaService)
      try {
        await prismaService.user.deleteMany({
          where: {
            email: 'email212344gmail.com'
          }})
        const user = {
          email: 'test@gmail.com',
          login: 'testlogin',
          password: 'Pass@1word',
          confirmPassword: 'Pass@1word'
        }
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(user)
          .expect(201)

        expect(response.body.email).toEqual(user.email);
      } finally {
        await prismaService.user.deleteMany({
          where: {
            email: 'test@gmail.com'
          }
        })
      }
    });
    it('/ register user not passes with invalid data (Post)', async () => {
      // const prismaService = app.get<PrismaService>(PrismaService)
      const user = {
        email: 'emailgmail.com',
        login: 'test',
        password: 'Pass@1',
        confirmPassword: 'Pass@1'
      }

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(user)
        .expect(400)

      expect(response.body).toBeDefined()
      expect(response.body).toHaveProperty('message', 'Custom validation message');

    });
  })

});
