
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true })
  title: string

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string

  @Prop({ required: false, trim: true })
  shortDescription?: string

  @Prop({ required: false, trim: true })
  longDescription?: string

  @Prop({ required: false, trim: true })
  role?: string

  @Prop({ required: false, trim: true })
  clientType?: string

  @Prop({ type: [String], default: [] })
  techStack: string[]

  @Prop({ type: [String], default: [] })
  highlights: string[]

  @Prop({ required: false })
  coverImageUrl?: string

  @Prop({ type: [String], default: [] })
  gallery: string[]

  @Prop({ required: false })
  githubUrl?: string

  @Prop({ required: false })
  liveUrl?: string

  @Prop({ required: false })
  startDate?: Date

  @Prop({ required: false })
  endDate?: Date

  @Prop({ default: 'draft' })
  status: 'draft' | 'published'

  @Prop({ default: false })
  isFeatured: boolean
}

export type ProjectDocument = Project & Document

export const ProjectSchema = SchemaFactory.createForClass(Project)
