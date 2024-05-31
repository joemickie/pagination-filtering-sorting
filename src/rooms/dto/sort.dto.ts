import { IsString, IsEnum } from 'class-validator';

export class SortDto {
  @IsString()
  field: string;

  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
