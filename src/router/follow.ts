import { Router } from 'express'
import { AuthMiddleware } from '../middleware/AuthMiddleware'
import { FollowController } from '../controller/FollowController'

const routes = Router()

routes.post('/:id', AuthMiddleware.verifyToken, FollowController.followUser)
export default routes
