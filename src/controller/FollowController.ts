import { Response } from 'express'
import { myDataBase } from '../db'
import { Follow } from '../entity/Follow'
import { User } from '../entity/User'
import { JwtRequest } from '../middleware/AuthMiddleware'

export class FollowController {
  static followUser = async (req: JwtRequest, res: Response) => {
    const { userId } = req.body
    const decoded = req.decoded

    const isExist = await myDataBase.getRepository(Follow).findOne({
      where: {
        following: { id: Number(userId) },
        followee: { id: Number(decoded.id) },
      },
    })

    if (!isExist) {
      const following = await myDataBase.getRepository(User).findOneBy({
        id: Number(userId),
      })
      const followee = await myDataBase.getRepository(User).findOneBy({
        id: decoded.id,
      })

      const follow = new Follow()
      follow.following = following
      follow.followee = followee

      await myDataBase.getRepository(Follow).insert(follow)
    } else {
      await myDataBase.getRepository(Follow).remove(isExist)
    }

    res.send({ message: 'success' })
  }
}
