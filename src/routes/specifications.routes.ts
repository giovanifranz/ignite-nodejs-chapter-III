import { Request, Response, Router } from 'express'

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

export const specificationRoutes = Router()
const specificationsRepository = new SpecificationsRepository()
specificationRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body

  const createSpecificationService = new CreateSpecificationService(specificationsRepository)
  createSpecificationService.execute({ name, description })

  return response.status(201).send()
})
