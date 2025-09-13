import { Request, Response } from 'express';
import { CreatePublisherUseCase } from './CreatePublisherUseCase';
import { ICreatePublisherDTO } from '../../dtos/ICreatePublisherDTO';
import { ValidationError } from '../../../../../shared/http/errors/ValidationError';

export class CreatePublisherController {

  constructor(private createPublisherUseCase: CreatePublisherUseCase) { }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, address, phone, website } = req.body;

      if (!name) {
        return res.status(400).json({ success: false, error: "Missing required field: name" });
      }

      const publisher: ICreatePublisherDTO = { name, address, phone, website };

      const newPublisher = await this.createPublisherUseCase.execute(publisher);

      return res.status(201).json({ success: true, data: newPublisher, message: "Publisher created successfully" });

    } catch (error) {

      if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      }

      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

}