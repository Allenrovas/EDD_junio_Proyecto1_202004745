//Usuarios
class Usuario{
    constructor(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono){
        this.dpi=dpi;
        this.nombre_completo=nombre_completo;
        this.nombre_usuario=nombre_usuario;
        this.correo=correo;
        this.rol=rol;
        this.contrasenia=contrasenia;
        this.telefono=telefono;
        this.siguiente=null;
        this.abajo=null;
    }
}
//Libros Usuarios
class LibrosUsuarios{
    constructor(nombre,usuario){
        this.nombre=nombre;
        this.usuario=usuario;
        this.siguiente=null;
    }
}
//ListasUsuarios
class ListaUsuarios{
    constructor(){
        this.cabeza = null;
        this.ultimo = null;
        this.tamanio = 0;
    }
    //Agregar Usuario
    InsertarUsuario(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono){
        var nuevo = new Usuario(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono);
        if(this.cabeza == null){
            this.cabeza = nuevo;
            this.ultimo = nuevo;
        }else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
            this.ultimo.siguiente = this.cabeza.siguiente;
        }
        this.tamanio++;
    }
    //Insertar Libros
    InsertarLibros(nombre,usuario){
        var temporarlusuario = this.cabeza;
        while(temporarlusuario != null){
            if (temporarlusuario.nombre_usuario == usuario){
                var nuevoLibro = new LibrosUsuarios(nombre,usuario);
                var inicioLibros = temporarlusuario.abajo;
                temporarlusuario.abajo = nuevoLibro;
                nuevoLibro.siguiente = inicioLibros;
                break;
            }
        }
        temporarlusuario = temporarlusuario.siguiente;
        //No se encontró usuario
    }

    RecorrerMenu(usuario,contrasenia){
    let actual = this.cabeza;
        if(actual != null){
            for (var i = 0; i < this.tamanio; i++) {
                if(actual.nombre_usuario == usuario && actual.contrasenia == contrasenia){
                    return actual;
                }
                actual = actual.siguiente;
            }
        }
    }
}


var listaUsuarios = new ListaUsuarios();
listaUsuarios.InsertarUsuario("2354168452525","Wilfred Perez","Wilfred","wilfred@gmail.com","Administrador","123","+502 (123) 123-4567");
listaUsuarios.InsertarUsuario("2354168452525","Wilfred Perez","Allenrovas","wilfred@gmail.com","Usuario","123","+502 (123) 123-4567");

//Pagina de Login
document.getElementById("IniciarSesion").onclick=function(){
    document.getElementById("Login").style.display="block";
    document.getElementById("Index").style.display="none";
    
}

//Entrada a Usuarios o Administracion
document.getElementById("btn_login").onclick=function(){
    
    let usuario = document.getElementById("usuarioLogin").value;
    let contrasenia = document.getElementById("usuarioContra").value;
    var usuarioEntrada = listaUsuarios.RecorrerMenu(usuario,contrasenia);
    if(usuarioEntrada.rol == "Administrador"){
        document.getElementById("Login").style.display="none";
        document.getElementById("Index").style.display="none";
        document.getElementById("Administracion").style.display="block";
    }
    else if(usuarioEntrada.rol == "Usuario"){
        document.getElementById("Login").style.display="none";
        document.getElementById("Index").style.display="none";
        document.getElementById("Administracion").style.display="none";
        document.getElementById("PaginaUsuario").style.display="block";
    }
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";


}

document.getElementById("btn_regresar").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
}

document.getElementById("btn_regresarAdministracion").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
}

document.getElementById("btn_regresarAdministracion").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
}




