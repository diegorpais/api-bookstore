import { Request, Response } from 'express';
import { FindAuthorByIdUseCase } from './FindAuthorByIdUseCase';

export class FindAuthorByIdController {
  constructor(private findAuthorByIdUseCase: FindAuthorByIdUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          success: false,
          message: 'Author ID is required'
        });
      }

      const author = await this.findAuthorByIdUseCase.execute(id);

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