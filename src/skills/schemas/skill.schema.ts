import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, trim: true })
  name: string // ej: "Frontend"

  @Prop({ required: true, trim: true })
  description: string // texto corto

  @Prop({ default: '' })
  icon?: string // opcional: nombre de icono o URL

  @Prop({ default: 0 })
  order: number // para ordenar en el home
}

export type SkillDocument = Skill & Document
export const SkillSchema = SchemaFactory.createForClass(Skill)
