import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BookCategory as DomainBookCategory } from '../../../domain/entities/BookCategory';

@Entity('book_categories')
export class BookCategory extends DomainBookCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'book_id' })
  bookId: string;

  @Column('uuid', { name: 'category_id' })
  categoryId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}