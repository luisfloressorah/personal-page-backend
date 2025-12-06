// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import * as crypto from 'crypto'

// 👇 ESTA ES LA CLAVE
import type { Response, Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // GET /api/auth/csrf
  @Get('csrf')
  getCsrf(@Res({ passthrough: true }) res: Response) {
    const token = crypto.randomBytes(24).toString('hex')

    res.cookie('XSRF-TOKEN', token, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false, // true en prod con HTTPS
    })

    return { csrfToken: token }
  }

  // POST /api/auth/login
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password)
    const token = await this.authService.createAccessToken(user)

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true en prod
      maxAge: 1000 * 60 * 60, // 1h
    })

    return { message: 'ok' }
  }

  // GET /api/auth/me
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return req.user
  }

  // POST /api/auth/logout
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true en prod
    })

    return { message: 'logged out' }
  }
}
