import { Request, Response } from 'express'
import { myDataBase } from '../db'
import { Like } from '../entity/Like'
import { Post } from '../entity/Post'

export class LikeController {
  static getLikes = async (req: Request, res: Response) => {
    const likes = await myDataBase.getRepository(Like).find({ relations: ['post'] })
    return res.status(200).send(likes)
  }
  static updateLike = async (req: Request, res: Response) => {
    // 이미 해당 게시글에 좋아요를 한 사람인지 확인
    const isExist = await myDataBase.getRepository(Like).findOne({
      where: {
        post: { id: Number(req.params.id) },
      },
    })
    // 이미 좋아요를 누른게 아니라면
    if (!isExist) {
      // 해당 게시글, 유저를 토대로 Like 생성
      const post = await myDataBase.getRepository(Post).findOneBy({
        id: Number(req.params.id),
      })
      const like = new Like()
      like.post = post
      await myDataBase.getRepository(Like).insert(like)
      return res.status(200).send('success update')
    } else {
      // 좋아요를 이미 누른 상황이라면 해당 좋아요 삭제
      await myDataBase.getRepository(Like).remove(isExist)
      return res.status(204).send('success delete')
    }
  }
}
