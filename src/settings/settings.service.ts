import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SiteSettings, SiteSettingsDocument } from './schemas/site-settings.schema'
import { UpdateHomeSettingsDto } from './dto/update-home-settings.dto'

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(SiteSettings.name)
    private readonly settingsModel: Model<SiteSettingsDocument>,
  ) {}

  private defaultHomeSettings() {
    return {
      headline: 'Construyo experiencias digitales con propósito y tecnología moderna.',
      subheadline:
        'Desarrollador enfocado en arquitectura web, UI moderna y backend eficiente. Creo soluciones pensadas para usuarios reales y entornos productivos.',
      badgeText: 'Desarrollador Web · React · Node.js',
      aboutTitle: 'Sobre mí',
      aboutBody:
        'Soy Luis Francisco Flores Robles, desarrollador full-stack con experiencia en React, Vue, Node.js y NestJS. Mi enfoque está en crear interfaces limpias, escalables y con rendimiento óptimo, manteniendo una arquitectura de código robusta y mantenible.',
      profileImageUrl: '',
      primaryCtaText: 'Ver proyectos',
      primaryCtaHref: '#projects',
      secondaryCtaText: 'Contáctame',
      secondaryCtaHref: '#contact',
    }
  }

  // 🔹 Obtener settings de la home (público)
  async getHomeSettings() {
    const doc = await this.settingsModel
      .findOne({ key: 'home' })
      .lean()
      .exec()

    if (!doc) {
      const defaults = this.defaultHomeSettings()
      const created = await this.settingsModel.create({
        key: 'home',
        ...defaults,
      })

      const { _id, key, __v, ...rest } = created.toObject()
      return rest
    }

    const { _id, key, __v, ...rest } = doc
    return rest
  }

  // 🔹 Actualizar settings de la home (admin)
  async updateHomeSettings(dto: UpdateHomeSettingsDto) {
    const updated = await this.settingsModel
      .findOneAndUpdate(
        { key: 'home' },
        { $set: dto, $setOnInsert: { key: 'home' } },
        { new: true, upsert: true },
      )
      .lean()
      .exec()

    const { _id, key, __v, ...rest } = updated
    return rest
  }
}
