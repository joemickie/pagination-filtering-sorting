import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';
import { QueryUtilModule } from '../query/query-util.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), QueryUtilModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
