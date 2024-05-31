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

  it('GET /rooms - should return list of rooms with default pagination, sorting by name ASC', async () => {
    const response = await request(app.getHttpServer())
      .get('/rooms')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('GET /rooms - should return list of rooms with custom pagination and sorting by capacity DESC', async () => {
    const response = await request(app.getHttpServer())
      .get('/rooms?page=1&limit=5&sort=[{"field":"capacity","order":"DESC"}]')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(5);
    expect(response.body[0].capacity).toBeGreaterThanOrEqual(0);
  });

  it('GET /rooms - should return list of rooms filtered by capacity and sorted by name ASC', async () => {
    const response = await request(app.getHttpServer())
      .get('/rooms?filters=[{"field":"capacity","value":10,"operator":"gte"}]&sort=[{"field":"name","order":"ASC"}]')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0].capacity).toBeGreaterThanOrEqual(10);
  });

  it('GET /rooms - should return list of rooms filtered by userId and sorted by capacity DESC', async () => {
    const response = await request(app.getHttpServer())
      .get('/rooms?filters=[{"field":"userId","value":1,"operator":"equals"}]&sort=[{"field":"capacity","order":"DESC"}]')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0].userId).toEqual(1);
  });

  it('GET /rooms - should return list of rooms filtered by name and sorted by userId ASC', async () => {
    const response = await request(app.getHttpServer())
      .get('/rooms?filters=[{"field":"name","value":"Room","operator":"like"}]&sort=[{"field":"userId","order":"ASC"}]')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0].name).toContain('Room');
  });

});
