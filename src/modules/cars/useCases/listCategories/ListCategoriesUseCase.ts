import { Category } from '../../model'
import { ICategoriesRepository } from '../../repositories'

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}
