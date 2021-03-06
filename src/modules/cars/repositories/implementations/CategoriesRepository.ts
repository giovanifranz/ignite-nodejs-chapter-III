import { Category } from '../../model'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name)
  }

  list(): Category[] {
    return this.categories
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }
}
