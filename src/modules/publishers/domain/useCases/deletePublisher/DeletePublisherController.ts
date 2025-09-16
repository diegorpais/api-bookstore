import { Request, Response } from 'express';
import { DeletePublisherUseCase } from './DeletePublisherUseCase';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class DeletePublisherController {
  constructor(private deletePublisherUseCase: DeletePublisherUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        return response.status(400).json({ success: false, error: "Valid Publisher ID is required" });
      }

      await this.deletePublisherUseCase.execute(id);

      return response.status(200).json({ success: true, message: 'Publisher deleted successfully' });

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json({ success: false, error: error.message });
      }

      return response.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}
