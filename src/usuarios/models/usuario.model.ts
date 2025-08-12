import { GetUserAplicacionDTO } from 'src/aplicaciones/dto/get.user_aplicacion.dto';

export class Usuario {
  nombreUsuario: string;
  email: string;
  password: string;
  aplicacionesDescargadas: GetUserAplicacionDTO[] = []; // Un DTO escpecífico para registrar las aplicaciones descargadas

  constructor(nombreUsuario: string, email: string, password: string) {
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
  }
}
