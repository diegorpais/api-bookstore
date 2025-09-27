import { Request, Response } from 'express';
import { CreateBookUseCase } from './CreateBookUseCase';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';
import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';

export class CreateBookController {
  constructor(private createBookUseCase: CreateBookUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const book: ICreateBookDTO = request.body;
      const newBook = await this.createBookUseCase.execute(book);

      return response.status(201).json({ success: true, data: newBook, message: "Book created successfully" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(error.statusCode).json({ success: false, error: error.message });
      }

      return response.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
}