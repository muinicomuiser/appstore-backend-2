import { Injectable, NotFoundException } from '@nestjs/common';
import { Aplicacion } from './models/aplicacion.model';
import { CreateAplicacionDTO } from './dto/create.aplicacion.dto';
import { UpdateAplicacionDTO } from './dto/update.aplicaicon.dto';

@Injectable()
export class AplicacionesService {
  aplicaciones: Aplicacion[] = [];

  crearAplicacion(nuevaAplicacion: CreateAplicacionDTO): Aplicacion {
    const aplicacionCreada: Aplicacion = new Aplicacion(
      this.aplicaciones.length + 1,
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

  obtenerYFiltraTodas(nombre?: string, so?: string): Aplicacion[] {
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
      throw new NotFoundException('Aplicacion no existe');
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

  // AUXILIAR
  buscar(callback: (elemento: Aplicacion) => boolean): Aplicacion | undefined {
    for (let i: number = 0; i < this.aplicaciones.length; i++) {
      if (callback(this.aplicaciones[i]) == true) {
        return this.aplicaciones[i];
      }
    }
    return undefined;
  }
}
