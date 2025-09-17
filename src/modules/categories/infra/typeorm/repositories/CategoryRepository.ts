import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { AppDataSource } from '../../../../../data-source';
import { Category as InfraCategory } from '../entities/Category';
import { Category as DomainCategory } from '../../../domain/entities/Category';
import { ICreateCategoryDTO } from '../../../domain/dtos/ICreateCategoryDTO';

export class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<InfraCategory>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(InfraCategory);
  }

  private convertInfraToDomain(infraCategory: InfraCategory): DomainCategory {
    return Object.assign(new DomainCategory(), infraCategory);
  }

  public async create(data: ICreateCategoryDTO): Promise<DomainCategory> {
    const id = uuidV4();
    const categoryWithId = { ...data, id };

    const categoryEntity = this.ormRepository.create(categoryWithId);
    const savedCategory = await this.ormRepository.save(categoryEntity);

    return this.convertInfraToDomain(savedCategory);
  }
}