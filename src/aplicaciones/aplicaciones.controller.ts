import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { CreateAplicacionDTO } from './dto/create.aplicacion.dto';
import { AplicacionesService } from './aplicaciones.service';
import { Aplicacion } from './models/aplicacion.model';
import { UpdateAplicacionDTO } from './dto/update.aplicacion.dto';

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
    return this.aplicacionesService.obtenerYFiltrarTodas(nombre, so);
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

  
  @HttpCode(204) // Respuesta OK sin body. 204: "Sin Contenido"
  @Delete(":id")
  eliminarAplicacion(
    @Param("id") id: string
  ): void{
    return this.aplicacionesService.eliminarAplicacion(Number(id))
  }
}
