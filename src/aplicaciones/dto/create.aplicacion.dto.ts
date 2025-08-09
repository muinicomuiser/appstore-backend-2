import { SistemaOperativo } from '../enum/sistema_operativo.enum';

export class CreateAplicacionDTO {
  constructor(
    public nombre: string,
    public precio: number,
    public sistemaOperativo: SistemaOperativo,
    public tamanio: number,
    public version: string,
  ) {}
}
