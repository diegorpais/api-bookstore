import { Request, Response } from 'express';
import { CreateAuthorUseCase } from './CreateAuthorUseCase';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class CreateAuthorController {
  constructor(private createAuthorUseCase: CreateAuthorUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, biography, birthDate, nationality } = request.body;

      if (!name || !birthDate || !nationality) {
        return response.status(400).json({
          success: false,
          error: "Missing required fields: name, birthDate, nationality"
        });
      }

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

      if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      }

      return response.status(500).json({
        success: false,
        error: 'Internal server error'
      });

    }
  }
}