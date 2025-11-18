import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'   // 👈 cambio aquí

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')               // todas las rutas empiezan con /api
  app.use(cookieParser())
  app.use('/', (req, res) => {
    res.send('Hello World!')
  })// para leer/escribir cookies

  await app.listen(3000)
}
bootstrap()
