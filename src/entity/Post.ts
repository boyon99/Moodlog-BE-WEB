import { Image } from 'aws-sdk/clients/iotanalytics'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinTable,
} from 'typeorm'
import { Comment } from './Comment'
import { Like } from './Like'
import { User } from './User'
import { FeelingCode } from './FeelingCode'
@Entity() // 해당 클래스는 DB 테이블
export class Post {
  @PrimaryGeneratedColumn() // Primary Key, 자동 생성
  id: number

  @Column()
  title: string

  @Column()
  body: string

  @Column()
  img: string

  @Column()
  open: boolean

  @Column()
  feeling_code: number

  @CreateDateColumn() // 생성 시의 시간 자동 기록
  createdAt: Date

  @UpdateDateColumn() // 수정 시의 시간 자동 기록
  updatedAt: Date

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[]

  @OneToMany(() => Like, (like) => like.post, { cascade: true })
  likes: Like[]

  @ManyToOne(() => User, (user) => user.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User
}
