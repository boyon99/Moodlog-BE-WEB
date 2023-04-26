import * as express from 'express'
import { PostController } from '../controller/PostController'
import { upload } from '../util/upload'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

const router = express.Router()

router.get('/', PostController.getPosts)
router.get('/:id', PostController.getPost)
router.post('/', upload.single('img'), AuthMiddleware.verifyToken, PostController.createPost)
router.put('/:id', upload.single('img'), AuthMiddleware.verifyToken, PostController.updatePost)
router.delete('/:id', AuthMiddleware.verifyToken, PostController.deletePost)

export default router
