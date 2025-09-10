import { ValidationError } from '../../../../../shared/http/errors/ValidationError';
import { IAuthorRepository } from '../../repositories/IAuthorRepository';

export class DeleteAuthorUseCase {
  constructor(private authorRepository: IAuthorRepository) { }

  public async execute(id: string): Promise<void> {
    const author = await this.authorRepository.findById(id);
    if (!author) throw new ValidationError(`Author with id ${id} not found`);

    await this.authorRepository.deleteAuthor(id);
  }
}