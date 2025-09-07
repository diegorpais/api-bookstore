import { Request, Response } from 'express';
import { CreateAuthorUseCase } from './CreateAuthorUseCase';

export class CreateAuthorController {
  constructor(private createAuthorUseCase: CreateAuthorUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, biography, birthDate, nationality } = request.body;

      const author = await this.createAuthorUseCase.execute({
        name,
        biography,
        birthDate,
        nationality,
      });

      return response.status(201).json({
        success: true,
        data: author,
        message: 'Author created successfully'
      });

    } catch (error) {
      console.error('Error creating author:', error);

      if (error.message.includes('required') ||
        error.message.includes('must have') ||
        error.message.includes('cannot be')) {
        return response.status(400).json({
          success: false,
          error: error.message
        });
      }

      return response.status(500).json({
        success: false,
        error: 'Internal server error'
      });
      
    }
  }
}