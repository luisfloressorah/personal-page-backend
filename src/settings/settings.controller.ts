import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { SettingsService } from './settings.service'
import { UpdateHomeSettingsDto } from './dto/update-home-settings.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // Público: obtener contenido de la home
  // GET /api/settings/home
  @Get('home')
  async getHome() {
    return this.settingsService.getHomeSettings()
  }

  // Admin: actualizar contenido de la home (requiere login)
  // PUT /api/settings/home
  @UseGuards(JwtAuthGuard)
  @Put('home')
  async updateHome(@Body() dto: UpdateHomeSettingsDto) {
    return this.settingsService.updateHomeSettings(dto)
  }
}
