import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IBookRepository } from '../../repositories/IBookRepository';
import { Book as DomainBook } from '../../entities/Book';
import { CreateBookValidator } from '../../validators/CreateBookValidator';

export class CreateBookUseCase {
  constructor(private bookRepository: IBookRepository) { }

  async execute(data: ICreateBookDTO): Promise<DomainBook> {
    CreateBookValidator.validate(data);
    return await this.bookRepository.createBook(data);
  }
}