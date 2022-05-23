import { getRepository, Repository } from 'typeorm'

import { Category } from '../../entities'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({ name })
  }

  async list(): Promise<Category[]> {
    return await this.repository.find()
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    })

    await this.repository.save(category)
  }
}
