import * as express from 'express'
import { LikeController } from '../controller/LikeController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

const router = express.Router()

router.get('/', LikeController.getLikes)
router.post('/:id', AuthMiddleware.verifyToken, LikeController.updateLike)

export default router
