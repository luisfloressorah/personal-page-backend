export class CreateExperienceDto {
  role: string
  company: string
  location?: string
  startDate?: Date
  endDate?: Date
  isCurrent?: boolean
  description?: string
  tags?: string[]
  order?: number
}
