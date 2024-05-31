import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(1)
  limit: number;
}
