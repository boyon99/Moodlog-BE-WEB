import { Request, Response } from 'express'
import { myDataBase } from '../db'
import { Post } from '../entity/Post'
import { Comment } from '../entity/Comment'
import { User } from '../entity/User'
import { JwtRequest } from '../middleware/AuthMiddleware'

export class CommentController {
  static createComment = async (req: JwtRequest, res: Response) => {
    const { id: userId } = req.decoded
    const user = await myDataBase.getRepository(User).findOneBy({
      id: userId,
    })
    // 요청 데이터 값 가져오기
    const { postId, body } = req.body
    // 해당 게시글 번호로 게시글 찾기
    const post = await myDataBase.getRepository(Post).findOneBy({
      id: postId,
    })
    if (!postId) {
      return res.status(401).send('No Post')
    }
    // 해당 값대로 Comment 객체 생성
    const comment = new Comment()
    comment.comment = body
    comment.post = post // 연결할 게시글 지정
    comment.user = user
    // 해당 객체대로 db 에 추가
    const result = await myDataBase.getRepository(Comment).insert(comment)
    return res.status(201).send(result)
  }

  static updateComment = async (req: JwtRequest, res: Response) => {
    const { id: userId } = req.decoded

    const currentPost = await myDataBase.getRepository(Comment).findOne({
      where: { id: Number(req.params.id) },
      relations: {
        user: true,
      },
    })

    if (userId !== currentPost.user.id) {
      // 글 작성자와 요청 보낸 사람이 일치하지 않으면
      return res.status(401).send('No Permission') // 거부
    }
    const result = await myDataBase.getRepository(Comment).update(Number(req.params.id), req.body)
    return res.status(200).send(result)
  }

  static deleteComment = async (req: JwtRequest, res: Response) => {
    const { id: userId } = req.decoded

    const currentPost = await myDataBase.getRepository(Comment).findOne({
      where: { id: Number(req.params.id) },
      relations: {
        user: true,
      },
    })
    if (userId !== currentPost.user.id) {
      // 글 작성자와 요청 보낸 사람이 일치하지 않으면
      return res.status(401).send('No Permission') // 거부
    }
    await myDataBase.getRepository(Comment).delete(Number(req.params.id))
    return res.status(204).send('success')
  }

  static getComments = async (req: Request, res: Response) => {
    const comments = await myDataBase.getRepository(Comment).find({
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          profile_image: true,
        },
      },
      relations: ['post', 'user'],
    })
    return res.status(200).send(comments)
  }
  static getComment = async (req: Request, res: Response) => {
    const comment = await myDataBase.getRepository(Comment).findOne({
      where: {
        id: Number(req.params.id),
      },
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          profile_image: true,
        },
      },
      relations: ['post', 'user'],
    })
    if (!comment) {
      return res.status(404).send('No Content')
    }
    return res.status(200).send(comment)
  }
}
