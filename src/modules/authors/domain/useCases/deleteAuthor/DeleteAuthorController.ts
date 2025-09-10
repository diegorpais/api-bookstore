import { Request, Response } from 'express';
import { DeleteAuthorUseCase } from './DeleteAuthorUseCase';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class DeleteAuthorController {
  constructor(private deleteAuthorUseCase: DeleteAuthorUseCase) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        return response.status(400).json({ success: false, error: "Valid Author ID is required" });
      }

      await this.deleteAuthorUseCase.execute(id);

      return response.status(200).json({ success: true, message: 'Author deleted successfully' });

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(error.statusCode ?? 400).json({ success: false, error: error.message });
      }

      return response.status(500).json({ success: false, error: 'Internal server error' });
    }

  }
}