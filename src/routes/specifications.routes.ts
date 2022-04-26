import type { Request, Response } from 'express'
import { Router } from 'express'

import { SpecificationsRepository } from '../modules/cars'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

export const specificationRoutes = Router()
const specificationsRepository = new SpecificationsRepository()
specificationRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body

  const createSpecificationService = new CreateSpecificationService(specificationsRepository)
  createSpecificationService.execute({ name, description })

  return response.status(201).send()
})
