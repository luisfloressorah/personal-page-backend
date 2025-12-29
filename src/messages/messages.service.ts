import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message, MessageDocument } from './schemas/message.schema'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageStatusDto } from './dto/update-message-status.dto'

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  // Público: crear mensaje
  async create(dto: CreateMessageDto) {
    const created = new this.messageModel({
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      message: dto.message.trim(),
      status: 'new',
    })
    return created.save()
  }

  // Admin: listar mensajes
  async findAll() {
    return this.messageModel.find().sort({ createdAt: -1 }).lean().exec()
  }

  // Admin: cambiar status
  async updateStatus(id: string, dto: UpdateMessageStatusDto) {
    const updated = await this.messageModel
      .findByIdAndUpdate(id, { $set: { status: dto.status } }, { new: true })
      .lean()
      .exec()

    if (!updated) throw new NotFoundException('Mensaje no encontrado')
    return updated
  }

  // Admin: borrar mensaje
  async remove(id: string) {
    const deleted = await this.messageModel.findByIdAndDelete(id).exec()
    if (!deleted) throw new NotFoundException('Mensaje no encontrado')
    return { message: 'deleted' }
  }
}
