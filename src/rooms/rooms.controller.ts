import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { PaginationDto } from './dto/pagination.dto';
import { FilterDto } from './dto/filter.dto';
import { SortDto } from './dto/sort.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('filters') filters: FilterDto[],
    @Query('sort') sort: SortDto[],
  ) {
    return this.roomsService.findAll(paginationDto, filters, sort);
  }
}
