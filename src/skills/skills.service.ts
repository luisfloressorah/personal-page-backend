import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Skill, SkillDocument } from './schemas/skill.schema'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name)
    private readonly skillModel: Model<SkillDocument>,
  ) {}

  async create(dto: CreateSkillDto) {
    const created = new this.skillModel({
      ...dto,
      order: dto.order ?? 0,
      icon: dto.icon ?? '',
    })
    return created.save()
  }

  async findAllPublic() {
    return this.skillModel.find().sort({ order: 1, createdAt: -1 }).lean().exec()
  }

  async findOne(id: string) {
    const doc = await this.skillModel.findById(id).lean().exec()
    if (!doc) throw new NotFoundException('Skill no encontrada')
    return doc
  }

  async update(id: string, dto: UpdateSkillDto) {
    const updated = await this.skillModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec()
    if (!updated) throw new NotFoundException('Skill no encontrada')
    return updated
  }

  async remove(id: string) {
    const deleted = await this.skillModel.findByIdAndDelete(id).exec()
    if (!deleted) throw new NotFoundException('Skill no encontrada')
    return { message: 'deleted' }
  }
}
