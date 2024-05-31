import { Module } from '@nestjs/common';
import { QueryUtilService } from './query-util.service';

@Module({
  providers: [QueryUtilService],
  exports: [QueryUtilService],
})
export class QueryUtilModule {}
