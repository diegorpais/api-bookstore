import { Request, Response } from 'express';
import { ListAllPublishersUseCase } from './ListAllPublishersUseCase';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class ListAllPublishersController {
  constructor(private listAllPublishersUseCase: ListAllPublishersUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // ?? só aplica o valor padrão se o valor à esquerda for estritamente null ou undefined
      // || aplica o valor padrão se o valor à esquerda for "falsy"
      // "falsy" em JavaScript incluem 0, "" (string vazia), null, undefined e, o mais importante para este caso, NaN.
      // NaN é o erro que vai gerar se o usuário não passar a query, então se usar ?? vai cair no erro 500 ao invés de assumir os valores padrão
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

      const publishers = await this.listAllPublishersUseCase.execute(paginationParams);

      return response.status(200).json({
        success: true,
        ...publishers,
        message: 'Publishers retrieved successfully'
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