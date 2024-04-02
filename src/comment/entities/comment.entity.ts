import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { Blog } from "../../blog/entities/blog.entity"

@Entity()
export class Comment {
  @Column({ primary: true, generated: true })
  id: number

  @Column({ length: 500 })
  text: string


  @ManyToOne(() => Blog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blogId', referencedColumnName: 'id', })
  blog: Blog

  @Column()
  blogId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
  user: User

  @Column()
  userEmail: string
}
