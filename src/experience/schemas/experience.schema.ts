import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true, trim: true })
  role: string // ej: "Fullstack Developer"

  @Prop({ required: true, trim: true })
  company: string // ej: "Freelance" / "Gobierno de X"

  @Prop({ required: false, trim: true })
  location?: string // opcional

  @Prop({ required: false })
  startDate?: Date

  @Prop({ required: false })
  endDate?: Date

  @Prop({ default: false })
  isCurrent: boolean // si sigues ahí

  @Prop({ required: false, trim: true })
  description?: string // texto largo corto (parrafo)

  @Prop({ type: [String], default: [] })
  tags: string[] // ej: ["React", "NestJS", "MongoDB"]

  @Prop({ default: 0 })
  order: number // si quieres ordenar manualmente
}

export type ExperienceDocument = Experience & Document
export const ExperienceSchema = SchemaFactory.createForClass(Experience)
