import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Book as DomainBook } from '../../../domain/entities/Book';
import { Publisher as InfraPublisher } from '../../../../publishers/infra/typeorm/entities/Publisher';

@Entity('books')
export class Book extends DomainBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column({ name: 'publication_year' })
  publicationYear: number;

  @Column()
  pages: number;

  @Column()
  synopsis: string;

  @Column()
  language: string;

  @Column({ name: 'publisher_id' })
  publisherId: string;

  @ManyToOne(() => InfraPublisher, (publisher) => publisher.books)
  @JoinColumn({ name: "publisher_id" })
  publisher: InfraPublisher;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
