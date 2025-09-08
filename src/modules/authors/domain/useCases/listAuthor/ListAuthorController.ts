import { Request, Response } from 'express';
import { ListAuthorUseCase } from './ListAuthorUseCase';

export class ListAllAuthorsController {
  constructor(private listAuthorUseCase: ListAuthorUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          success: false,
          message: 'Author ID is required'
        });
      }

      const author = await this.listAuthorUseCase.execute(id);

      if (!author) {
        return response.status(404).json({
          success: false,
          message: 'Author not found'
        });
      } 

      return response.status(200).json({
        success: true,
        data: author,
        message: 'Author retrieved successfully'
      });

    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}