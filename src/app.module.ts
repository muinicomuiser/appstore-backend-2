import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AplicacionesModule } from './aplicaciones/aplicaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ReseniaModule } from './resenia/resenia.module';

@Module({
  imports: [AplicacionesModule, UsuariosModule, ReseniaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
