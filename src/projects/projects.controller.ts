import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // GET /api/projects
  // Publico: lista de proyectos publicados.
  // Admin: si ?admin=true y está autenticado → todos.
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllAdmin(@Query('admin') admin?: string) {
    if (admin === 'true') {
      return this.projectsService.findAllAdmin()
    }
    // si no viene admin=true, simplemente devuelve publicados
    return this.projectsService.findAllPublished()
  }

  // GET /api/projects/public
  // Ruta 100% pública para el frontend (por si quieres separar)
  @Get('public/list')
  async findPublicList() {
    return this.projectsService.findAllPublished()
  }

  // GET /api/projects/slug/:slug (detalle público)
  @Get('slug/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return this.projectsService.findOneBySlug(slug)
  }

  // GET /api/projects/:id (detalle admin)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.projectsService.findOneById(id)
  }

  // POST /api/projects (crear) – solo admin
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto)
  }

  // PUT /api/projects/:id (editar) – solo admin
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto)
  }

  // DELETE /api/projects/:id – solo admin
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id)
    return { message: 'deleted' }
  }
}
