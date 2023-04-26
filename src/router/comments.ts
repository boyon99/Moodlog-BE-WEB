import * as express from 'express'
import { CommentController } from '../controller/CommentController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

const router = express.Router()
router.post('/', AuthMiddleware.verifyToken, CommentController.createComment)
router.get('/', CommentController.getComments)
router.get('/:id', CommentController.getComment)
router.put('/:id', AuthMiddleware.verifyToken, CommentController.updateComment)
router.delete('/:id', AuthMiddleware.verifyToken, CommentController.deleteComment)

export default router
