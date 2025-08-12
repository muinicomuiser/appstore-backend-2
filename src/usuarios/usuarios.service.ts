import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './models/usuario.model';
import { GetUsuarioDTO } from './dto/get.usuario.dto';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { NotFoundError } from 'rxjs';
import { UpdateUsuarioDTO } from './dto/update.usuario.dto';
import { GetUserAplicacionDTO } from 'src/aplicaciones/dto/get.user_aplicacion.dto';

@Injectable()
export class UsuariosService {

    usuarios: Usuario[] = [
        new Usuario('juanperez', 'juan.perez@email.com', 'pass1234'),
        new Usuario('mariagomez', 'maria.gomez@email.com', 'secret5678'),
        new Usuario('carlitos_1', 'carlos.sanchez@email.com', 'securepass!'),
        new Usuario('laura_rodriguez', 'laura.r@email.com', 'laurapass2025'),
        new Usuario('pedro_g', 'pedro.gonzalez@email.com', 'mipassword'),
        new Usuario('sofia_m', 'sofia.martinez@email.com', 'contrasenaFuerte'),
        new Usuario('daniel_a', 'daniel.a@email.com', 'password101'),
        new Usuario('valeria_p', 'valeria.perez@email.com', 'mipassword123'),
        new Usuario('andres_f', 'andres.f@email.com', 'pass_segura'),
        new Usuario('camila_l', 'camila.lopez@email.com', 'password456')
    ]

    // 15.a.i: Crear Usuario
    crearUsuario(crearUsuarioDTO: CreateUsuarioDTO): GetUsuarioDTO{
        // Considerar que el nombreUsuario es el identificador único, por lo tanto no puede repetirse.
        // Si ya existe un usuario con el mismo nombre de usuario, se devuelve un Bad Request
        const usuarioExiste: Usuario | undefined = this.usuarios.find(usuario => usuario.nombreUsuario == crearUsuarioDTO.nombreUsuario)
        if(usuarioExiste){
            throw new BadRequestException("El nombre de usuario ya está registrado")
        }
        const nuevoUsuario: Usuario = new Usuario(
            crearUsuarioDTO.nombreUsuario,
            crearUsuarioDTO.email,
            crearUsuarioDTO.password
        )
        this.usuarios.push(nuevoUsuario)
        return new GetUsuarioDTO(
            nuevoUsuario.nombreUsuario,
            nuevoUsuario.email,
            nuevoUsuario.aplicacionesDescargadas
        )
    }
    
    // 15.a.ii: Obtener Usuario según nombreUsuario
    obtenerPorNombreUsuario(nombreUsuario: string): GetUsuarioDTO{
        const usuario: Usuario | undefined = this.usuarios.find(usuario => usuario.nombreUsuario == nombreUsuario)
        if(!usuario){
            throw new NotFoundException("No existe un usuario con ese nombre")
        }
        return new GetUsuarioDTO(
            usuario.nombreUsuario,
            usuario.email,
            usuario.aplicacionesDescargadas
        )
    }
    
    // 15.a.iii: Obtener todos los usuarios
    obtenerTodosFiltrados(email?: string): GetUsuarioDTO[]{
        if(email){
            // El método .includes() permite buscar coincidencias parciales.
            const usuarioEncontrados = this.usuarios.filter(usuario => usuario.email.includes(email))
            // Map del conjunto para devolver un conjunto de DTOs
            return usuarioEncontrados.map(usuario => new GetUsuarioDTO(
                usuario.nombreUsuario,
                usuario.email,
                usuario.aplicacionesDescargadas
            ))
        }
        return this.usuarios.map(usuario => new GetUsuarioDTO(
            usuario.nombreUsuario,
            usuario.email,
            usuario.aplicacionesDescargadas
        ))

    } 
    
    // 15.a.iv: Modificar usuario
    actualizarUsuario(nombreUsuario: string, updateUsuarioDTO: UpdateUsuarioDTO): GetUsuarioDTO{
        const usuario: Usuario | undefined = this.usuarios.find(usuario => usuario.nombreUsuario == nombreUsuario)
        if(!usuario){
            throw new NotFoundException("Nombre de usuario no existe")
        }

        if(updateUsuarioDTO.password) {
            usuario.password = updateUsuarioDTO.password
        }
        if(updateUsuarioDTO.email) {
            usuario.email = updateUsuarioDTO.email
        }
        return new GetUsuarioDTO(
            usuario.nombreUsuario,
            usuario.email,
            usuario.aplicacionesDescargadas
        )        
    } 
    
    // 15.a.v: Eliminar Usuario por nombreUsuario
    eliminarUsuario(nombreUsuario: string): void{
        const indiceConcidencia: number = this.usuarios.findIndex(usuario => usuario.nombreUsuario == nombreUsuario)
        if(indiceConcidencia < 0){
            throw new NotFoundException("Nombre de usuario no existe")
        }
        this.usuarios.splice(indiceConcidencia, 1)
    }    
    
    // 15.a.vi: Descargar una aplicación
    descargarAplicacion(nombreUsuario: string, aplicacionDTO: GetUserAplicacionDTO): GetUsuarioDTO{
        const usuario: Usuario | undefined = this.usuarios.find(usuario => usuario.nombreUsuario == nombreUsuario)
        if(!usuario){
            throw new NotFoundException("Nombre de usuario no existe")
        }
        usuario.aplicacionesDescargadas.push(aplicacionDTO)               
        return new GetUsuarioDTO(
            usuario.nombreUsuario,
            usuario.email,
            usuario.aplicacionesDescargadas
        ) 
    }
}
