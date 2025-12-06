export class CreateProjectDto {
  title: string
  slug: string
  shortDescription?: string
  longDescription?: string
  role?: string
  clientType?: string
  techStack?: string[]
  highlights?: string[]
  coverImageUrl?: string
  gallery?: string[]
  githubUrl?: string
  liveUrl?: string
  startDate?: Date
  endDate?: Date
  status?: 'draft' | 'published'
  isFeatured?: boolean
}
