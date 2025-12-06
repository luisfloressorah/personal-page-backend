// src/users/users.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    const adminEmail = 'admin@personalpage.com'
    const exists = await this.userModel.exists({ email: adminEmail })
    if (!exists) {
      const passwordHash = await bcrypt.hash('admin123', 10)
      await this.userModel.create({
        email: adminEmail,
        name: 'Admin',
        passwordHash,
      })
      console.log('Admin creado:', adminEmail, 'password: admin123')
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec()
  }

  async validatePassword(
    user: UserDocument,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash)
  }

  sanitizeUser(user: UserDocument) {
    const obj = user.toObject()
    delete obj.passwordHash
    return obj
  }
}
