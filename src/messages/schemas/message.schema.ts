import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, trim: true })
  name: string

  @Prop({ required: true, trim: true, lowercase: true })
  email: string

  @Prop({ required: true, trim: true })
  message: string

  @Prop({ default: 'new' })
  status: 'new' | 'read' | 'archived'
}

export type MessageDocument = Message & Document
export const MessageSchema = SchemaFactory.createForClass(Message)
