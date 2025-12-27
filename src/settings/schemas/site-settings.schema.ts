import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class SiteSettings {
  @Prop({ required: true, unique: true })
  key: string // por ejemplo: "home"

  @Prop()
  headline?: string

  @Prop()
  subheadline?: string

  @Prop()
  badgeText?: string

  @Prop()
  aboutTitle?: string

  @Prop()
  aboutBody?: string

  @Prop()
  profileImageUrl?: string

  @Prop()
  primaryCtaText?: string

  @Prop()
  primaryCtaHref?: string

  @Prop()
  secondaryCtaText?: string

  @Prop()
  secondaryCtaHref?: string
}

export type SiteSettingsDocument = SiteSettings & Document

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings)
