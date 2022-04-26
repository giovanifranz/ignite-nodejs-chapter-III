import type { Request, Response } from 'express'
import { Router } from 'express'

import { CategoriesRepository } from '../repositories'
import { CreateCategoryService } from '../services'

export const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  createCategoryService.execute({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})
