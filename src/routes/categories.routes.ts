import { Router } from 'express'
import type { Request, Response } from 'express'
import { CategoriesRepository } from '../repositories'

export const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body
  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) {
    return response.status(400).json({
      error: 'Category already exists'
    })
  }

  categoriesRepository.create({ description, name })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})
