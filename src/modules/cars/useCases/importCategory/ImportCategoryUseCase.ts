import csvParser from 'csv-parser'
import fs from 'node:fs'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

export class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []
      const parseFile = csvParser(['name', 'description'])

      fs.createReadStream(file.path).pipe(parseFile)

      parseFile
        .on('data', async (line: IImportCategory) => {
          categories.push(line)
        })
        .on('end', () => {
          resolve(categories)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map((category) => {
      const { name, description } = category

      const existCategoryInRepository = this.categoryRepository.findByName(name)

      if (!existCategoryInRepository) {
        this.categoryRepository.create({ name, description })
      }
    })
  }
}
