import { GetUserAplicacionDTO } from "src/aplicaciones/dto/get.user_aplicacion.dto";

/** DTO para mostrar datos de usuario. */
export class GetUsuarioDTO{
  nombreUsuario: string;
  email: string;
  aplicacionesDescargadas: GetUserAplicacionDTO[]
  constructor(nombreUsuario: string, email: string, aplicacionesDescargadas: GetUserAplicacionDTO[]) {
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.aplicacionesDescargadas = aplicacionesDescargadas;
  }
}