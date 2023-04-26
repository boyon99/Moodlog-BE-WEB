import { Request, Response } from 'express'
import { myDataBase } from '../db'
import { Post } from '../entity/Post'
import { FeelingCode } from '../entity/FeelingCode'
import { Comment } from '../entity/Comment'
import { Like } from '../entity/Like'
import { User } from '../entity/User'
import { RequestImg } from '../middleware/AuthMiddleware'

export class FeelingCodeController {
  static getFeelingCode = async (req: Request, res: Response) => {
    const feelings = await myDataBase.getRepository(FeelingCode).find()
    return res.status(200).send(feelings)
  }

  static createFeelingCode = async (req: RequestImg, res: Response) => {
    const { code } = req.body
    const { location } = req.file
    const feeling = new FeelingCode()
    feeling.code = code
    feeling.img = location
    await myDataBase.getRepository(FeelingCode).save(feeling)
    return res.status(201).send('success')
  }

  static deleteFeelingCode = async (req: Request, res: Response) => {
    await myDataBase.getRepository(FeelingCode).delete(Number(req.params.id))
    return res.status(204).send('success')
  }
}
