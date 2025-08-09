import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateAplicacionDTO } from './dto/create.aplicacion.dto';
import { AplicacionesService } from './aplicaciones.service';
import { Aplicacion } from './models/aplicacion.model';
import { UpdateAplicacionDTO } from './dto/update.aplicaicon.dto';

@Controller('aplicaciones')
export class AplicacionesController {
  constructor(private readonly aplicacionesService: AplicacionesService) {}
  // Crear App
  @Post()
  crearAplicacion(@Body() bodyAplicacion: CreateAplicacionDTO): Aplicacion {
    return this.aplicacionesService.crearAplicacion(bodyAplicacion);
  }

  // Obtener por ID
  @Get(':id')
  obtenerPorId(@Param('id') id: string): Aplicacion {
    const idNumber: number = Number(id);
    return this.aplicacionesService.obtenerPorId(idNumber);
  }

  // Obtener todas las apps
  @Get()
  obtenerTodas(
    @Query('nombre') nombre?: string,
    @Query('so') so?: string,
  ): Aplicacion[] {
    return this.aplicacionesService.obtenerYFiltraTodas(nombre, so);
  }

  @Put(':id')
  actualizarAplicacion(
    @Param('id') id: string,
    @Body() updateAplicacion: UpdateAplicacionDTO,
  ): Aplicacion {
    return this.aplicacionesService.actualizarAplicacion(
      Number(id),
      updateAplicacion,
    );
  }
}
