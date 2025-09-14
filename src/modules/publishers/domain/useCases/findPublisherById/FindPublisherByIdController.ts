import { Request, Response } from 'express';

import { FindPublisherByIdUseCase } from './FindPublisherByIdUseCase'

export class FindPublisherByIdController {
  constructor(private findPublisherByIdUseCase: FindPublisherByIdUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      if (!id) return response.status(400).json({ success: false, error: 'Publisher id is required' });

      const publisher = await this.findPublisherByIdUseCase.execute(id);
      if (!publisher) return response.status(404).json({ success: false, error: 'Publisher not found' });

      return response.status(200).json({
        success: true,
        data: publisher,
        message: 'Publisher retrieved successfully'
      });

    } catch (error) {
      return response.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}
