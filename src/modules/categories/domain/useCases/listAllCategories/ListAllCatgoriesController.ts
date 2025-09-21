import { Request, Response } from 'express';
import { ListAllCategoriesUseCase } from './ListAllCategoriesUseCase';

export class ListAllCategoriesController {

  constructor(private listAllCategoriesUseCase: ListAllCategoriesUseCase) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {

      const categories = await this.listAllCategoriesUseCase.execute();

      return response.status(200).json({
        success: true,
        data: categories,
        message: 'Categories retrieved successfully'
      });

    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
} 