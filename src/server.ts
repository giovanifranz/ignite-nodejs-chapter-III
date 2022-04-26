import express from 'express'

import { categoriesRoutes, specificationRoutes } from './routes'

const app = express()

app.use(express.json())

app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationRoutes)

app.listen(3333, () => console.log('Server started on port 3333'))
