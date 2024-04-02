import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Comment } from "../../comment/entities/comment.entity"
import { User } from "../../users/entities/user.entity"


@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true, type: 'text' })
  text: string

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => Comment, (comment) => comment.blog, { cascade: true, eager: true })
  comments: Comment[]


  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User

  @Column()
  userEmail: string
}
