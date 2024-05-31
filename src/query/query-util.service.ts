import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../rooms/dto/pagination.dto';
import { FilterDto } from '../rooms/dto/filter.dto';
import { SortDto } from '../rooms/dto/sort.dto';

@Injectable()
export class QueryUtilService {
  applyPagination(queryBuilder: SelectQueryBuilder<any>, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    queryBuilder.skip(page * limit).take(limit);
  }

  applyFilters(queryBuilder: SelectQueryBuilder<any>, filters: FilterDto[]) {
    filters.forEach(filter => {
      const { field, value, valueNumber, operator } = filter;
      switch (operator) {
        case 'equals':
          queryBuilder.andWhere(`${field} = :value`, { value });
          break;
        case 'not':
          queryBuilder.andWhere(`${field} != :value`, { value });
          break;
        case 'gt':
          queryBuilder.andWhere(`${field} > :value`, { value: valueNumber });
          break;
        case 'gte':
          queryBuilder.andWhere(`${field} >= :value`, { value: valueNumber });
          break;
        case 'lt':
          queryBuilder.andWhere(`${field} < :value`, { value: valueNumber });
          break;
        case 'lte':
          queryBuilder.andWhere(`${field} <= :value`, { value: valueNumber });
          break;
        case 'like':
          queryBuilder.andWhere(`${field} LIKE :value`, { value: `%${value}%` });
          break;
        case 'in':
          queryBuilder.andWhere(`${field} IN (:...value)`, { value: value.split(',') });
          break;
        case 'notIn':
          queryBuilder.andWhere(`${field} NOT IN (:...value)`, { value: value.split(',') });
          break;
        case 'isNull':
          queryBuilder.andWhere(`${field} IS NULL`);
          break;
        case 'isNotNull':
          queryBuilder.andWhere(`${field} IS NOT NULL`);
          break;
      }
    });
  }

  applySorting(queryBuilder: SelectQueryBuilder<any>, sort: SortDto[]) {
    sort.forEach(s => {
      const { field, order } = s;
      queryBuilder.addOrderBy(field, order);
    });
  }
}
