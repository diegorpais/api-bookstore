import { Request, Response } from 'express';
import { FindBooksByAuthorUseCase } from './FindBooksByAuthorUseCase';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class FindBooksByAuthorController {
  constructor(private findBooksByAuthorUseCase: FindBooksByAuthorUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      if (!id) { throw new ValidationError('Author ID is required'); }

      const books = await this.findBooksByAuthorUseCase.execute(id);

      return response.status(200).json({ success: true, data: books, message: 'Books retrieved successfully', });

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({ success: false, error: error.message, });
      }

      return response.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}
