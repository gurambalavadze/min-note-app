import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_CONNECTION } from '../db/db.module';
import * as schema from '../db/schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { FilterNotesDto } from './dto/filter-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @Inject(DB_CONNECTION) private db: NodePgDatabase<typeof schema>,
    @InjectQueue('notes-cache') private cacheQueue: Queue,
  ) {}

  async create(userId: string, dto: CreateNoteDto) {
    const [note] = await this.db
      .insert(schema.notes)
      .values({
        userId,
        title: dto.title,
        content: dto.content,
        tags: dto.tags || [],
      })
      .returning();

    return note;
  }

  async findAll(userId: string, filterDto?: FilterNotesDto) {
    const tags = filterDto?.tags?.trim().split(',');
    const cacheKey = this.generateCacheKey(userId, tags);

    const cachedResult = await this.cacheQueue.getJob(cacheKey);
    if (cachedResult && cachedResult.returnvalue) {
      return cachedResult.returnvalue;
    }

    let notes = await this.db.query.notes.findMany({
      where: eq(schema.notes.userId, userId),
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    // Filter notes that have at least one matching tag
    if (tags && tags.length > 0) {
      notes = notes.filter(
        (note) => note.tags && tags.every((tag) => note.tags?.includes(tag)),
      );
    }

    await this.cacheQueue.add(
      'cache-notes',
      {
        cacheKey,
        data: notes,
      },
      {
        jobId: cacheKey,
        removeOnComplete: false,
        removeOnFail: true,
      },
    );

    return notes;
  }

  async findOne(userId: string, noteId: string) {
    const note = await this.db.query.notes.findFirst({
      where: and(eq(schema.notes.id, noteId), eq(schema.notes.userId, userId)),
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(userId: string, noteId: string, dto: UpdateNoteDto) {
    const note = await this.db.query.notes.findFirst({
      where: eq(schema.notes.id, noteId),
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this note',
      );
    }

    const [updatedNote] = await this.db
      .update(schema.notes)
      .set({
        ...dto,
        updatedAt: new Date(),
      })
      .where(eq(schema.notes.id, noteId))
      .returning();

    return updatedNote;
  }

  async delete(userId: string, noteId: string) {
    const note = await this.db.query.notes.findFirst({
      where: eq(schema.notes.id, noteId),
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (note.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this note',
      );
    }

    await this.db.delete(schema.notes).where(eq(schema.notes.id, noteId));

    return { message: 'Note deleted successfully' };
  }

  private generateCacheKey(userId: string, tags?: string[]): string {
    if (tags && tags.length > 0) {
      const sortedTags = [...tags].sort().join('-');
      return `notes-${userId}-tags-${sortedTags}`;
    }
    return `notes-${userId}-all`;
  }
}
