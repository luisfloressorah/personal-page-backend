import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ExperienceService } from './experience.service'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { UpdateExperienceDto } from './dto/update-experience.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  // Público
  @Get()
  async list() {
    return this.experienceService.findAllPublic()
  }

  // Admin
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateExperienceDto) {
    return this.experienceService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experienceService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.experienceService.remove(id)
  }
}
