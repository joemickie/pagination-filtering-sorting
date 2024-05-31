import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class FilterDto {
  @IsString()
  field: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsNumber()
  valueNumber?: number;

  @IsEnum(['equals', 'not', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'notIn', 'isNull', 'isNotNull'])
  operator: string;
}
