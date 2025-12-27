import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Experience, ExperienceSchema } from './schemas/experience.schema'
import { ExperienceService } from './experience.service'
import { ExperienceController } from './experience.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Experience.name, schema: ExperienceSchema }]),
  ],
  providers: [ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
