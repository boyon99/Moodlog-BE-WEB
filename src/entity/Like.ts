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
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity() // 해당 클래스는 DB 테이블
export class Like {
  @PrimaryGeneratedColumn() // Primary Key, 자동 생성
  id: number

  @CreateDateColumn() // 생성 시의 시간 자동 기록
  createdAt: Date

  @UpdateDateColumn() // 수정 시의 시간 자동 기록
  updatedAt: Date

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  post: Post

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User
}
