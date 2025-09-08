import { Request, Response } from 'express';
import { ListAllAuthorsUseCase } from './ListAllAuthorsUseCase';


export class ListAllAuthorsController {

  constructor(private listAllAuthorsUseCase: ListAllAuthorsUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const authors = await this.listAllAuthorsUseCase.execute();

      return response.status(200).json({
        success: true,
        data: authors,
        message: 'Authors retrieved successfully'
      });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}