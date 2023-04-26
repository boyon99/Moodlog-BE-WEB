import { Request, Response } from 'express'
import { myDataBase } from '../db'
import { Post } from '../entity/Post'
import { User } from '../entity/User'
import { JwtRequest } from '../middleware/AuthMiddleware'

export class PostController {
  static getPosts = async (req: Request, res: Response) => {
    const posts = await myDataBase.getRepository(Post).find({
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          profile_image: true,
          profile_message: true,
          createdAt: true,
          updatedAt: false,
        },
        comments: {
          id: true,
          comment: true,
          createdAt: true,
          updatedAt: false,
          user: {
            id: true,
            email: true,
            username: true,
            profile_image: true,
            profile_message: true,
          },
        },
      },
      relations: ['comments', 'likes', 'user', 'comments.user'],
    })
    return res.status(200).send(posts)
  }
  static getPost = async (req: JwtRequest, res: Response) => {
    const post = await myDataBase.getRepository(Post).findOne({
      where: {
        id: Number(req.params.id),
      },
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          profile_image: true,
          profile_message: true,
          createdAt: true,
          updatedAt: false,
        },
        comments: {
          id: true,
          comment: true,
          createdAt: true,
          updatedAt: false,
          user: {
            id: true,
            email: true,
            username: true,
            profile_image: true,
            profile_message: true,
          },
        },
      },
      relations: ['comments', 'comments.user', 'likes', 'user'],
    })
    if (!post) {
      // 해당 번호의 글이 없다면 404 응답
      return res.status(404).send('No Content')
    }
    return res.status(200).send(post)
  }

  static createPost = async (req: JwtRequest, res: Response) => {
    const { title, body, feeling_code, open } = req.body
    const { id: userId } = req.decoded
    const user = await myDataBase.getRepository(User).findOneBy({
      id: userId,
    })

    const post = new Post()
    post.title = title
    post.body = body
    post.feeling_code = feeling_code
    post.open = open
    post.user = user

    if (req.file) {
      const { location } = req.file
      post.img = location
    }
    // 해당 객체대로 db 에 추가
    const result = await myDataBase.getRepository(Post).save(post)
    return res.status(201).send(result)
  }

  static updatePost = async (req: JwtRequest, res: Response) => {
    const { id: userId } = req.decoded

    const currentPost = await myDataBase.getRepository(Post).findOne({
      where: { id: Number(req.params.id) },
      relations: {
        user: true, // 데이터 가져올 때 author 도 표시하도록 설정 / ['author'] 라고 작성해도 됨
      },
    })

    if (userId !== currentPost.user.id) {
      // 글 작성자와 요청 보낸 사람이 일치하지 않으면
      return res.status(401).send('No Permission') // 거부
    }

    const { title, body, feeling_code, open } = req.body

    const post = new Post()
    post.title = title
    post.body = body
    post.feeling_code = feeling_code
    post.open = open

    if (req.file) {
      const { location } = req.file
      post.img = location
    }

    const result = await myDataBase.getRepository(Post).update(Number(req.params.id), post)
    return res.status(200).send(result)
  }

  static deletePost = async (req: JwtRequest, res: Response) => {
    const { id: userId } = req.decoded

    const currentPost = await myDataBase.getRepository(Post).findOne({
      where: { id: Number(req.params.id) },
      relations: {
        user: true,
      },
    })
    if (userId !== currentPost.user.id) {
      // 글 작성자와 요청 보낸 사람이 일치하지 않으면
      return res.status(401).send('No Permission') // 거부
    }

    await myDataBase.getRepository(Post).delete(Number(req.params.id))
    return res.status(204).send('success')
  }
}
