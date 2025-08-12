import { Injectable, NotFoundException } from '@nestjs/common';
import { Aplicacion } from './models/aplicacion.model';
import { CreateAplicacionDTO } from './dto/create.aplicacion.dto';
import { UpdateAplicacionDTO } from './dto/update.aplicacion.dto';
import { SistemaOperativo } from './enum/sistema_operativo.enum';
import { GetUserAplicacionDTO } from './dto/get.user_aplicacion.dto';

@Injectable()
export class AplicacionesService {
  aplicaciones: Aplicacion[] = 
  [
    new Aplicacion(1, 'PhotoEdit Pro', 2.99, SistemaOperativo.ANDROID, 85.5, '3.4.1'),
    new Aplicacion(2, 'HealthTracker X', 0.00, SistemaOperativo.IOS, 120.2, '5.0.0'),
    new Aplicacion(3, 'Nebula Browser', 0.00, SistemaOperativo.ANDROID, 62.1, '1.8.0'),
    new Aplicacion(4, 'ZenMeditation', 4.99, SistemaOperativo.IOS, 95.8, '2.1.5'),
    new Aplicacion(5, 'Game Blitz 3D', 0.00, SistemaOperativo.ANDROID, 250.0, '1.0.2'),
    new Aplicacion(6, 'BudgetFlow', 0.99, SistemaOperativo.IOS, 78.9, '4.0.0'),
    new Aplicacion(7, 'Star Atlas', 1.99, SistemaOperativo.ANDROID, 155.6, '1.1.0'),
    new Aplicacion(8, 'Retro Arcade', 0.00, SistemaOperativo.IOS, 180.3, '3.2.1'),
    new Aplicacion(9, 'SecurePass', 0.00, SistemaOperativo.ANDROID, 45.7, '2.3.0'),
    new Aplicacion(10, 'Foodie Finder', 2.49, SistemaOperativo.IOS, 110.4, '1.5.8')
];

  crearAplicacion(nuevaAplicacion: CreateAplicacionDTO): Aplicacion {
    const aplicacionCreada: Aplicacion = new Aplicacion(
      this.aplicaciones[this.aplicaciones.length -1].id + 1,
      nuevaAplicacion.nombre,
      nuevaAplicacion.precio,
      nuevaAplicacion.sistemaOperativo,
      nuevaAplicacion.tamanio,
      nuevaAplicacion.version,
    );
    this.aplicaciones.push(aplicacionCreada);
    return aplicacionCreada;
  }

  obtenerPorId(id: number): Aplicacion {
    const coincidencia = this.buscar((elemento) => {
      return elemento.id === id;
    });
    if (coincidencia) {
      return coincidencia;
    }
    throw new NotFoundException('Aplicación no existe');
  }

  obtenerYFiltrarTodas(nombre?: string, so?: string): Aplicacion[] {
    if (!nombre && !so) {
      return this.aplicaciones;
    } else if (nombre || so) {
      const aplicaciones =
        nombre != undefined
          ? this.aplicaciones.filter((app) => app.nombre.includes(nombre))
          : this.aplicaciones.filter((app) => app.sistemaOperativo == so);
      return aplicaciones;
    } else
      return this.aplicaciones.filter(
        (app) => app.nombre == nombre && app.sistemaOperativo == so,
      );
  }

  actualizarAplicacion(
    id: number,
    updateAplicacion: UpdateAplicacionDTO,
  ): Aplicacion {
    const aplicacion = this.aplicaciones.find((app) => app.id == id);
    if (!aplicacion) {
      throw new NotFoundException('Aplicación no existe');
    }
    if (updateAplicacion.precio) {
      aplicacion.precio = updateAplicacion.precio;
    }
    if (updateAplicacion.version) {
      aplicacion.version = updateAplicacion.version;
    }
    if (updateAplicacion.tamanio) {
      aplicacion.tamanio = updateAplicacion.tamanio;
    }
    return aplicacion;
  }

  eliminarAplicacion(id: number): void{
    // Se puede aprovechar el método de "obtenerPorId" para verificar si existe, pues ya envía el error de Not Found si no encuentra coincidencia.
    this.obtenerPorId(id)
    const indiceEliminada: number = this.aplicaciones.findIndex(app => app.id == id)
    this.aplicaciones.splice(indiceEliminada, 1)
  }

  // AUXILIAR
  buscar(callback: (elemento: Aplicacion) => boolean): Aplicacion | undefined {
    for (let i: number = 0; i < this.aplicaciones.length; i++) {
      if (callback(this.aplicaciones[i]) == true) {
        return this.aplicaciones[i];
      }
    }
    return undefined;
  }

  obtenerUserAplicacionDTOPorId(id: number): GetUserAplicacionDTO{
    const aplicacion = this.obtenerPorId(id)
    return new GetUserAplicacionDTO(
      aplicacion.id,
      aplicacion.nombre,
      aplicacion.precio,
      aplicacion.version
    )
  }
}
