import { Request, Response } from 'express';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        return response.status(400).json({ success: false, error: "Valid Category ID is required" });
      }

      await this.deleteCategoryUseCase.execute(id);
      return response.status(204).send();

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(error.statusCode ?? 400).json({ success: false, error: error.message });
      }

      return response.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}