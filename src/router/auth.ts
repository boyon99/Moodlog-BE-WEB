import { Router } from 'express'
import { upload } from '../util/upload'
import { UserController } from '../controller/UserController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

const routes = Router()

routes.post('/register', upload.single('img'), UserController.register)
routes.post('/login', UserController.login)
routes.post('/logout', UserController.logout)
routes.delete('/withdrawal', AuthMiddleware.verifyToken, UserController.withdrawal)
routes.get('/refresh', AuthMiddleware.verifyRefreshToken, UserController.refresh)
routes.get('/verify', AuthMiddleware.verifyToken, UserController.verify)
routes.get('/user', AuthMiddleware.verifyToken, UserController.getProfile)
routes.get('/user/:id', UserController.getUser)
routes.put('/user', AuthMiddleware.verifyToken, upload.single('img'), UserController.updateProfile)

export default routes
