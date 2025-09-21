import { Request, Response } from 'express';
import { ListAllCategoriesPaginatedUseCase } from './ListAllCategoriesPaginatedUseCase';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class ListAllCategoriesPaginatedController {
  constructor(private listAllCategoriesPaginatedUseCase: ListAllCategoriesPaginatedUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const page = parseInt(request.query.page as string) || 1;
      const limit = parseInt(request.query.limit as string) || 10;
      const sortBy = (request.query.sortBy as string) || 'id';
      const sortOrderParam = (request.query.sortOrder as string)?.toUpperCase() || 'ASC';
      const sortOrder: 'ASC' | 'DESC' = sortOrderParam === 'DESC' ? 'DESC' : 'ASC';

      const paginationParams: PaginationParamsDTO = {
        page,
        limit,
        sortBy,
        sortOrder
      };

      const categories = await this.listAllCategoriesPaginatedUseCase.execute(paginationParams);

      return response.status(200).json({
        success: true,
        ...categories,
        message: 'Categories retrieved successfully'
      });

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(400).json({ success: false, error: error.message });
      }

      return response.status(500).json({
        success: false,
        message: 'Error retrieving publishers'
      });
    }
  }
}