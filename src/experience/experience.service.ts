import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Experience, ExperienceDocument } from './schemas/experience.schema'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { UpdateExperienceDto } from './dto/update-experience.dto'

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private readonly expModel: Model<ExperienceDocument>,
  ) {}

  async create(dto: CreateExperienceDto) {
    const created = new this.expModel({
      ...dto,
      tags: dto.tags ?? [],
      order: dto.order ?? 0,
      isCurrent: dto.isCurrent ?? false,
    })
    return created.save()
  }

  async findAllPublic() {
    // Orden sugerido:
    // 1) order asc (si lo usas)
    // 2) startDate desc (para mostrar lo más reciente)
    return this.expModel
      .find()
      .sort({ order: 1, startDate: -1, createdAt: -1 })
      .lean()
      .exec()
  }

  async findOne(id: string) {
    const doc = await this.expModel.findById(id).lean().exec()
    if (!doc) throw new NotFoundException('Experiencia no encontrada')
    return doc
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const updated = await this.expModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec()

    if (!updated) throw new NotFoundException('Experiencia no encontrada')
    return updated
  }

  async remove(id: string) {
    const deleted = await this.expModel.findByIdAndDelete(id).exec()
    if (!deleted) throw new NotFoundException('Experiencia no encontrada')
    return { message: 'deleted' }
  }
}
