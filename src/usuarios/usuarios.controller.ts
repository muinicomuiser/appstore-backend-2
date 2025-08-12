import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { GetUsuarioDTO } from './dto/get.usuario.dto';
import { UpdateUsuarioDTO } from './dto/update.usuario.dto';
import { AplicacionesService } from 'src/aplicaciones/aplicaciones.service';
import { GetUserAplicacionDTO } from 'src/aplicaciones/dto/get.user_aplicacion.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly aplicacionesService: AplicacionesService
    ){}

    // 15.a.i: Crear Usuario
    // Se puede usar un DTO específico también para obtener el usuario creado, y no mostrar todos los datos del usuario.
    @Post()
    crearUsuario(@Body() crearUsuarioDTO: CreateUsuarioDTO): GetUsuarioDTO{
        return this.usuariosService.crearUsuario(crearUsuarioDTO)
    }
    
    // 15.a.ii: Obtener Usuario según nombreUsuario
    @Get(":nombreUsuario")
    obtenerPorNombreUsuario(@Param("nombreUsuario") nombreUsuario: string): GetUsuarioDTO{
        return this.usuariosService.obtenerPorNombreUsuario(nombreUsuario)
    }
    
    // 15.a.iii: Obtener todos los usuarios
    @Get()
    obtenerTodosFiltrados(@Query("email") email?: string): GetUsuarioDTO[]{
        return this.usuariosService.obtenerTodosFiltrados(email)
    }
    
    
    // 15.a.iv: Modificar usuario
    @Put(":nombreUsuario")
    actualizarUsuario(@Param("nombreUsuario") nombreUsuario: string, @Body() updateUsuarioDTO: UpdateUsuarioDTO): GetUsuarioDTO{
        console.log(updateUsuarioDTO)
        return this.usuariosService.actualizarUsuario(nombreUsuario, updateUsuarioDTO)
    }
    
    // 15.a.v: Eliminar Usuario por nombreUsuario
    @HttpCode(204) // Respuesta OK sin body. 204: "Sin Contenido"
    @Delete(":nombreUsuario")
    eliminarUsuario(@Param("nombreUsuario") nombreUsuario: string): void{
        return this.usuariosService.eliminarUsuario(nombreUsuario)
    }  
    
    // 15.a.vi: Descargar una aplicación
    // Para esto necesitamos inyectar en el constructor el service de aplicaciones.
    // Es necesario también agregar el AplicacionesSevice como Provider en el UsuariosModule
    @Get(":nombreUsuario/aplicaciones/:idAplicacion")
    descargarAplicacion(
        @Param("nombreUsuario") nombreUsuario: string,
        @Param("idAplicacion") idAplicacion: string        
    ): GetUsuarioDTO{
        // Obtener la aplicación que descargará el usuario
        const aplicacionDTO: GetUserAplicacionDTO = this.aplicacionesService.obtenerUserAplicacionDTOPorId(Number(idAplicacion))
        // Este método agrega la aplicación al usuario y retorna un usuario DTO
        return this.usuariosService.descargarAplicacion(nombreUsuario, aplicacionDTO)
    }
}
