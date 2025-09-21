import { Request, Response } from 'express';
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';
import { IUpdateCategoryDTO } from '../../dtos/IUpdateCategoryDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class UpdateCategoryController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ success: false, error: "Category ID is required" });
      }

      const { name, description } = request.body ?? {};
      const patch: IUpdateCategoryDTO = { name, description };

      if (Object.values(patch).every(v => v === undefined)) {
        return response.status(400).json({ success: false, error: "No fields to update" });
      }

      const updateCategory = await this.updateCategoryUseCase.execute(id, patch);

      if (!updateCategory) {
        return response.status(404).json({ success: false, error: "Category not found" });
      }

      return response.status(200).json({
        success: true,
        data: updateCategory,
        message: 'Category updated successfully'
      });

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(error.statusCode ?? 400).json({ success: false, error: error.message });
      }

      return response.status(500).json({
        success: false,
        error: 'Internal server error'
      });

    }
  }
}