import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Room } from '../src/rooms/room.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoomsController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Room>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleFixture.get<Repository<Room>>(getRepositoryToken(Room));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET rooms', async () => {
    const response = await request(app.getHttpServer())
      .get('/rooms?page=0&limit=10&filters=[]&sort=[{"field":"name","order":"ASC"}]')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  // Additional tests for other queries
});
