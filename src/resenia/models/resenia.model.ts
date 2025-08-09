import { Aplicacion } from 'src/aplicaciones/models/aplicacion.model';
import { Usuario } from 'src/usuarios/models/usuario.model';

export class Resenia {
  id: number;
  usuario: Usuario;
  aplicacion: Aplicacion;
  calificacion: number;
  texto: string;
  fecha: Date = new Date();

  constructor(
    id: number,
    usuario: Usuario,
    aplicacion: Aplicacion,
    calificacion: number,
    texto: string,
  ) {
    this.id = id;
    this.usuario = usuario;
    this.aplicacion = aplicacion;
    this.calificacion = calificacion;
    this.texto = texto;
  }
}
