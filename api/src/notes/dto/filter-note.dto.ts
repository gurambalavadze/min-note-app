import { IsArray, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterNotesDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  tags?: string;
}
