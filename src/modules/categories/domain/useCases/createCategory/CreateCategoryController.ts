import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      if (!name) return response.status(400).json({ success: false, error: 'Name is required' });

      const category: ICreateCategoryDTO = {
        name,
        description: description && description.trim() !== '' ? description : undefined,
      };

      await this.createCategoryUseCase.execute(category);

      return response.status(201).json({ success: true, data: category, message: 'Category created successfully' });

    } catch (error) {

      if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({ success: false, error: error.message });
      }


      return response.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}