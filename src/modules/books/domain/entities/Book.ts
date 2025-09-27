export class Book {
  id: string;
  title: string;
  isbn: string;
  publicationYear: number;
  pages: number;
  synopsis: string;
  language: string;
  publisherId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
