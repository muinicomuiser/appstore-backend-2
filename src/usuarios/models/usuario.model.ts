import { Aplicacion } from 'src/aplicaciones/models/aplicacion.model';

export class Usuario {
  nombreUsuario: string;
  email: string;
  password: string;
  aplicacionesDescargadas: Aplicacion[] = [];

  constructor(nombreUsuario: string, email: string, password: string) {
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
  }
}
