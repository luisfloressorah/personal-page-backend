// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { UserDocument } from '../users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email)
    console.log('user', user)
    console.log('email', email)
    console.log('password', password)
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    const ok = await this.usersService.validatePassword(user, password)
    console.log('ok', ok)
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    return user
  }

  async createAccessToken(user: UserDocument): Promise<string> {
    const payload = { sub: user.id, email: user.email }
    return this.jwtService.signAsync(payload)
  }
}
