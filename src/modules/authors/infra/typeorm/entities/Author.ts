import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Author as DomainAuthor } from '../../../domain/entities/Author';

@Entity('authors')
export class Author extends DomainAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  biography: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column()
  nationality: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}