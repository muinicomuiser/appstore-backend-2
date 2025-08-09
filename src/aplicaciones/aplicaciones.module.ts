import { Module } from '@nestjs/common';
import { AplicacionesController } from './aplicaciones.controller';
import { AplicacionesService } from './aplicaciones.service';

@Module({
  controllers: [AplicacionesController],
  providers: [AplicacionesService]
})
export class AplicacionesModule {}
