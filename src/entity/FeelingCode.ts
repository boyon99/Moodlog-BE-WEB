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
export class FeelingCode {
  @PrimaryGeneratedColumn() // Primary Key, 자동 생성
  id: number

  @Column()
  code: number

  @Column()
  img: string

  @CreateDateColumn() // 생성 시의 시간 자동 기록
  createdAt: Date

  @UpdateDateColumn() // 수정 시의 시간 자동 기록
  updatedAt: Date
}
