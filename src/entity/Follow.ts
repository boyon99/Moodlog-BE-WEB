import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number

  //팔로우를 받는 유저
  @ManyToOne(() => User, (user) => user.follower, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  follower: User

  //팔로우를 하는 유저
  @ManyToOne(() => User, (user) => user.following, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  following: User
}
