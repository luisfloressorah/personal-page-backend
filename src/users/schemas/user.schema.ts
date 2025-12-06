// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string

  @Prop({ required: true, trim: true })
  name: string

  @Prop({ required: true })
  passwordHash: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
