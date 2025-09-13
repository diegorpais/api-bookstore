import { Request, Response } from 'express';
import { ListAllPublishersUseCase } from './ListAllPublishersUseCase';

export class ListAllPublishersController {
  constructor(private listAllPublishersUseCase: ListAllPublishersUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const publishers = await this.listAllPublishersUseCase.execute();

      return response.status(200).json({
        success: true,
        data: publishers,
        message: 'Publishers retrieved successfully'
      });

    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Error retrieving publishers'
      });
    }
  }
}