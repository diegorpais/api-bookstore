import { Request, Response } from 'express';
import { UpdateAuthorUseCase } from './UpdateAuthorUseCase';
import { IUpdateAuthorDTO } from '../../dtos/IUpdateAuthorDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class UpdateAuthorController {
  constructor(private updateAuthorUseCase: UpdateAuthorUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ success: false, error: "Author ID is required" });
      }

      const { name, biography, birthDate, nationality } = request.body ?? {};
      const patch: IUpdateAuthorDTO = { name, biography, birthDate, nationality };

      if (Object.values(patch).every(v => v === undefined)) {
        return response.status(400).json({ success: false, error: "No fields to update" });
      }

      const updatedAuthor = await this.updateAuthorUseCase.execute(id, patch);

      if (!updatedAuthor) {
        return response.status(404).json({ success: false, message: 'Author not found' });
      }

      return response.status(200).json({
        success: true,
        data: updatedAuthor,
        message: 'Author updated successfully'
      });

    } catch (error) {
      if (error instanceof ValidationError) {
        return response.status(error.statusCode ?? 400).json({ success: false, error: error.message });
      }

      return response.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}