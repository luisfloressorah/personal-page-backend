import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Project, ProjectDocument } from './schemas/project.schema'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  // Crear proyecto
  async create(dto: CreateProjectDto): Promise<Project> {
    const created = new this.projectModel({
      ...dto,
      techStack: dto.techStack ?? [],
      highlights: dto.highlights ?? [],
      gallery: dto.gallery ?? [],
      status: dto.status ?? 'draft',
      isFeatured: dto.isFeatured ?? false,
    })
    return created.save()
  }

  // Listar proyectos (público)
  async findAllPublished(): Promise<Project[]> {
    return this.projectModel
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .exec()
  }

  // Listar proyectos para admin (todos)
  async findAllAdmin(): Promise<Project[]> {
    return this.projectModel.find().sort({ createdAt: -1 }).exec()
  }

  // Buscar por ID (para admin)
  async findOneById(id: string): Promise<Project> {
    const proj = await this.projectModel.findById(id).exec()
    if (!proj) throw new NotFoundException('Proyecto no encontrado')
    return proj
  }

  // Buscar por slug (para página pública de detalle)
  async findOneBySlug(slug: string): Promise<Project> {
    const proj = await this.projectModel.findOne({ slug }).exec()
    if (!proj || proj.status !== 'published') {
      throw new NotFoundException('Proyecto no encontrado')
    }
    return proj
  }

  // Actualizar (admin)
  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const proj = await this.projectModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec()
    if (!proj) throw new NotFoundException('Proyecto no encontrado')
    return proj
  }

  // Eliminar (admin)
  async remove(id: string): Promise<void> {
    const res = await this.projectModel.findByIdAndDelete(id).exec()
    if (!res) throw new NotFoundException('Proyecto no encontrado')
  }
}
