export class Book {
  id: string;
  title: string;
  isbn: string;
  publication_year: number;
  pages: number;
  synopsis: string;
  language: string;
  publisher_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
