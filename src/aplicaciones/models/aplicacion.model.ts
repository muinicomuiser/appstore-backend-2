// id: number (identificador único de la aplicación, generado automáticamente)
// nombre: String (nombre de la aplicación)
// precio: Number (precio de la aplicación, puede ser 0 para aplicaciones gratuitas)
// sistemaOperativo: Enum (sistema operativo compatible: "Android", "iOS")
// calificacion: Number (calificación promedio de la aplicación basada en las reseñas de los usuarios)
// tamaño: number (tamaño de la aplicación en MB)
// version: String (versión de la aplicación)
// descargas: number (número de descargas de la aplicación)

import { SistemaOperativo } from '../enum/sistema_operativo.enum';

export class Aplicacion {
  id: number;
  nombre: string;
  precio: number;
  sistemaOperativo: SistemaOperativo;
  calificacion: number = 0;
  tamanio: number;
  version: string;
  descargas: number;
  constructor(
    id: number,
    nombre: string,
    precio: number,
    sistemaOperativo: SistemaOperativo,
    tamanio: number,
    version: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.sistemaOperativo = sistemaOperativo;
    this.tamanio = tamanio;
    this.version = version;
    this.descargas = 0;
  }
}