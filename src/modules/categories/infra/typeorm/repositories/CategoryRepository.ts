import { In, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { AppDataSource } from '../../../../../data-source';
import { Category as InfraCategory } from '../entities/Category';
import { Category as DomainCategory } from '../../../domain/entities/Category';
import { ICreateCategoryDTO } from '../../../domain/dtos/ICreateCategoryDTO';
import { PaginationParamsDTO } from '../../../../../shared/domain/dtos/PaginationParamsDTO';
import { PaginatedResultDTO } from '../../../../../shared/domain/dtos/PaginatedResultDTO';
import { IUpdateCategoryDTO } from '../../../domain/dtos/IUpdateCategoryDTO';

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

  public async listAllCategories(): Promise<DomainCategory[]> {
    const categories = await this.ormRepository.find();
    return categories.map(category => this.convertInfraToDomain(category));
  }

  public async listAllCategoriesPaginated(params: PaginationParamsDTO): Promise<PaginatedResultDTO<DomainCategory>> {
    const { page, limit, sortBy = 'id', sortOrder = 'ASC' } = params;
    const skip = (page - 1) * limit;

    const [categories, totalItems] = await this.ormRepository.findAndCount({
      order: { [sortBy]: sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC' },
      skip,
      take: limit,
    });

    const domainCategories = categories.map(category => this.convertInfraToDomain(category));
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: domainCategories,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    };
  }

  public async findCategoryById(id: string): Promise<DomainCategory | null> {
    const category = await this.ormRepository.findOneBy({ id });
    return category ? this.convertInfraToDomain(category) : null;
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async updateCategory(id: string, data: IUpdateCategoryDTO): Promise<DomainCategory | null> {
    const preloaded = await this.ormRepository.preload({ id, ...data });
    if (!preloaded) return null;

    const saved = await this.ormRepository.save(preloaded);
    return this.convertInfraToDomain(saved);
  }

  public async findByIds(ids: Array<string>): Promise<Array<DomainCategory> | null> {
    const categories = await this.ormRepository.findBy({ id: In(ids) });
    return categories.length ? categories.map(category => this.convertInfraToDomain(category)) : null;
  }
}