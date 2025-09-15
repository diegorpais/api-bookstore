import { Request, Response } from 'express';
import { UpdatePublisherUseCase } from './UpdatePublisherUseCase';
import { IUpdatePublisherDTO } from '../../dtos/IUpdatePublisherDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class UpdatePublisherController {
  constructor(private updatePublisherUseCase: UpdatePublisherUseCase) { }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id) return response.status(400).json({ success: false, error: 'Publisher ID is required' });

      const { name, address, phone, website } = request.body ?? {};

      const patch: IUpdatePublisherDTO = { name, address, phone, website };

      if (Object.values(patch).every(v => v === undefined)) {
        return response.status(400).json({ success: false, error: "No fields to update" });
      }

      const updatePublisher = await this.updatePublisherUseCase.execute(id, patch);

      if (!updatePublisher) return response.status(404).json({ success: false, message: 'Publisher not found' });

      return response.status(200).json({
        success: true,
        data: updatePublisher,
        message: 'Publisher updated successfully'
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
