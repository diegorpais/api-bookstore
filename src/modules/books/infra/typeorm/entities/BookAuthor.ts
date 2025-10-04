import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BookAuthor as DomainBookAuthor } from '../../../domain/entities/BookAuthor';

@Entity('book_authors')
export class BookAuthor extends DomainBookAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'book_id' })
  bookId: string;

  @Column('uuid', { name: 'author_id' })
  authorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
