import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RolesGuard } from './auth/rules.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  //app.useGlobalGuards(new RolesGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
