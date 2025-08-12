/** Clase para agregar al arrego de aplicaciones de un usuario */
export class GetUserAplicacionDTO{
  id: number;   // Para buscar después la referencia
  nombre: string;   // Para mostrar un identificador claro
  precio: number;   // Podría considerarse como el precio al que la compró el usuario
  version: string;  // Puede ser la versión que tiene el usuario
    constructor(
      id: number,
      nombre: string,
      precio: number,
      version: string,
    ) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.version = version;
    }
}