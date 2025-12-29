import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageStatusDto } from './dto/update-message-status.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Público: el formulario del sitio manda aquí
  @Post()
  async create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto)
  }

  // Admin: lista mensajes
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return this.messagesService.findAll()
  }

  // Admin: actualizar status
  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateMessageStatusDto,
  ) {
    return this.messagesService.updateStatus(id, dto)
  }

  // Admin: borrar
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.messagesService.remove(id)
  }
}
