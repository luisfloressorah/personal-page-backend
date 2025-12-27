// src/app.module.ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { SettingsModule } from './settings/settings.module'
import { SkillsModule } from './skills/skills.module'


@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/personal-page',
    ),
    UsersModule,
    AuthModule,
    ProjectsModule,
    SettingsModule,
    SkillsModule,
  ],
})
export class AppModule {}
