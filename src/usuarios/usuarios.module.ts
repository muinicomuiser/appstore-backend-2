import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { AplicacionesService } from 'src/aplicaciones/aplicaciones.service';

@Module({
  controllers: [UsuariosController],
  // Se incluye el AplicacionesService que será usado por el controller de usuarios
  providers: [UsuariosService, AplicacionesService]
})
export class UsuariosModule {}
