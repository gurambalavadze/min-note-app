import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
