import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { SkillsService } from './skills.service'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  // Público
  @Get()
  async list() {
    return this.skillsService.findAllPublic()
  }

  // Admin
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateSkillDto) {
    return this.skillsService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.skillsService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.skillsService.remove(id)
  }
}
