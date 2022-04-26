import type { Request, Response } from 'express'
import { Router } from 'express'

import { CategoriesRepository } from '../modules/cars'
import { createCategoryController } from '../modules/cars/useCases/createCategory'

export const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})
