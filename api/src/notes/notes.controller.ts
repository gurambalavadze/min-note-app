import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Queue } from 'bullmq';
import { FilterNotesDto } from './dto/filter-note.dto';
import { InjectQueue } from '@nestjs/bullmq';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(
    private notesService: NotesService,
    @InjectQueue('notes-cache') private notesCacheQueue: Queue,
  ) {}

  @Post()
  create(@Request() req, @Body() dto: CreateNoteDto) {
    return this.notesService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Request() req, @Query() filterDto: FilterNotesDto) {
    return this.notesService.findAll(req.user.userId, filterDto);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.notesService.findOne(req.user.userId, id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.notesService.delete(req.user.userId, id);
  }
}
