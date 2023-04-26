import * as express from 'express'
import { FeelingCodeController } from '../controller/FeelingCodeController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'
import { upload } from '../util/upload'

const router = express.Router()
router.post('/', upload.single('img'), FeelingCodeController.createFeelingCode)
router.get('/', FeelingCodeController.getFeelingCode)
router.delete('/:id', FeelingCodeController.deleteFeelingCode)

export default router
