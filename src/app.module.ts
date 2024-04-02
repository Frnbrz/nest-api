import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { BlogModule } from './blog/blog.module'
import { CommentModule } from './comment/comment.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl: process.env.POSTGRES_SSL === "true",
        extra: {
          ssl:
            process.env.POSTGRES_SSL === "true"
              ? {
                rejectUnauthorized: false,
              }
              : null,
        },
      },
    }),
    UsersModule,
    AuthModule,
    BlogModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
