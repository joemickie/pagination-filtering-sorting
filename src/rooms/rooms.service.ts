import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { PaginationDto } from './dto/pagination.dto';
import { FilterDto } from './dto/filter.dto';
import { SortDto } from './dto/sort.dto';
import { QueryUtilService } from '../query/query-util.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    private queryUtilService: QueryUtilService,
  ) {}

  async findAll(paginationDto: PaginationDto, filters: FilterDto[], sort: SortDto[]) {
    const queryBuilder = this.roomsRepository.createQueryBuilder('room');
    this.queryUtilService.applyFilters(queryBuilder, filters);
    this.queryUtilService.applySorting(queryBuilder, sort);
    this.queryUtilService.applyPagination(queryBuilder, paginationDto);

    return await queryBuilder.getManyAndCount();
  }
}
