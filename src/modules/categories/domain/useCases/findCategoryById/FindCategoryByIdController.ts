import { Request, Response } from 'express';
import { FindCategoryByIdUseCase } from './FindCategoryByIdUseCase';

export class FindCategoryByIdController {
  constructor(private findCategoryByIdUseCase: FindCategoryByIdUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          success: false,
          error: 'Category ID is required'
        });
      }

      const category = await this.findCategoryByIdUseCase.execute(id);

      if (!category) {
        return response.status(404).json({
          success: false,
          error: 'Category not found'
        });
      }

      return response.status(200).json({
        success: true,
        data: category,
        message: 'Category retrieved successfully'
      });
    } catch (error) {
      return response.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}