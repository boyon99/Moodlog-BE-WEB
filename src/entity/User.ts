import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Post } from './Post'
import { Follow } from './Follow'
import { Comment } from './Comment'
import { Like } from './Like'
// import { Comment } from './Comment'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  profile_image: string

  @Column()
  profile_message: string

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  post: Post[]

  @OneToMany(() => Follow, (follow) => follow.following)
  following: Follow[]

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower: Follow[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
