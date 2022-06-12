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

class Nodo_Cabecera{
    constructor(id){
        this.id = id;
        this.siguiente = null;
        this.anterior = null;
        this.acceso = null;
    }
    getAcceso(){
        return this.acceso;
    }
    setAcceso(nuevo_acceso){
        this.acceso = nuevo_acceso;
    }
    getId(){
        return this.id;
    }  
}

class Lista_Cabecera{
    constructor(tipo){
        this.primero = null;
        this.ultimo = null;
        this.tipo = tipo; //si son columnas o filas
        this.size = 0;
    }
    getPrimero(){
        return this.primero;
    }

    insertar_nodoCabecera(nuevo){
        this.size+=1;
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            // ---- Insercion en ORDEN
            // -- verificamos si el nuevo es menor que el primero
            if (nuevo.id < this.primero.id){
                nuevo.siguiente = this.primero;
                this.primero.anterior = nuevo;
                this.primero = nuevo;
            }else if(nuevo.id > this.ultimo.id){
                // -- verificamos si el nuevo es mayor que el ultimo
                this.ultimo.siguiente = nuevo;
                nuevo.anterior = this.ultimo;
                this.ultimo = nuevo;
            }else{
                // -- sino, recorremos la lista para buscar donde acomodarnos, entre el primero y el ultimo
                var temporalCabecera = this.primero;
                while(temporalCabecera != null){
                    if(nuevo.getId() < temporalCabecera.getId()){
                        nuevo.siguiente = temporalCabecera;
                        nuevo.anterior = temporalCabecera.anterior;
                        temporalCabecera.anterior.siguiente = nuevo;
                        temporalCabecera.anterior = nuevo;
                        break;
                    }else if(nuevo.getId() > temporalCabecera.getId()){
                        temporalCabecera = temporalCabecera.siguiente;
                    }else{
                        break;
                    }
                }
            }
        }
    }

    mostrarCabeceras(){
        let tmp = this.primero;
        while(tmp != null){
            console.log(tmp.getId());
            tmp = tmp.siguiente;
        }
    }

    getCabecera(id){
        var temporalCabecera;
        temporalCabecera = this.primero;
        while(temporalCabecera != null){
            if(temporalCabecera.id == id){
                return temporalCabecera;
            }
            temporalCabecera = temporalCabecera.siguiente;
        }
        return null;
    }

}

class Nodo_Celda{
    constructor(x,y,libro){
        this.coordenadaX = x;
        this.coordenadaY = y;
        this.libro = libro;
        this.arriba = null;
        this.abajo = null;
        this.izquierda = null;
        this.derecha = null;
    }
    setArriba(arriba){
        this.arriba = arriba;
    }
    setAbajo(abajo){
        this.abajo = abajo;
    }
    setIzquierda(izquierda){
        this.izquierda = izquierda;
    }
    setDerecha(derecha){
        this.derecha = derecha;
    }
    getArriba(){
        return this.arriba;
    }
    getAbajo(){
        return this.abajo;
    }
    getIzquierda(){
        return this.izquierda;
    }
    getDerecha(){
        return this.derecha;
    }
}

class Matriz_Dispersa{
    constructor(){
        this.filas = new Lista_Cabecera("fila");
        this.columnas = new Lista_Cabecera("columna");
        this.capa = 0;
    }
    insertar(pos_x,pos_y,libro){
        var nueva_celda = new Nodo_Celda(pos_x,pos_y,libro);
        var nodo_X = this.filas.getCabecera(pos_x);
        var nodo_Y = this.columnas.getCabecera(pos_y);
        if(nodo_X == null){
            nodo_X = new Nodo_Cabecera(pos_x);
            this.filas.insertar_nodoCabecera(nodo_X);
        }
        if(nodo_Y == null){
            nodo_Y = new Nodo_Cabecera(pos_y);
            this.columnas.insertar_nodoCabecera(nodo_Y);
        }
        if (nodo_X.getAcceso() == null){
            nodo_X.setAcceso(nueva_celda);
        }else{
            if (nueva_celda.coordenadaY < nodo_X.getAcceso().coordenadaY){
                nueva_celda.setDerecha(nodo_X.getAcceso());
                nodo_X.getAcceso().setIzquierda(nueva_celda);
                nodo_X.setAcceso(nueva_celda);
            }else{
                var tmp = nodo_X.getAcceso();
                while(tmp != null){
                    if(nueva_celda.coordenadaY < tmp.coordenadaY){
                        nueva_celda.setDerecha(tmp);
                        nueva_celda.setIzquierda(tmp.getIzquierda());
                        tmp.getIzquierda().setDerecha(nueva_celda);
                        tmp.setIzquierda(nueva_celda);
                        break;
                    }else if(nueva_celda.coordenadaX == tmp.coordenadaX && nueva_celda.coordenadaY == tmp.coordenadaY){
                        break;
                    }else{
                        if (tmp.getDerecha() == null){
                            tmp.setDerecha(nueva_celda);
                            nueva_celda.setIzquierda(tmp);
                            break;
                        }else{
                            tmp = tmp.getDerecha();
                        }
                    }
                }
            }
        }
        if (nodo_Y.getAcceso() == null){
            nodo_Y.setAcceso(nueva_celda);
        }else{
            if (nueva_celda.coordenadaX < nodo_Y.getAcceso().coordenadaX){
                nueva_celda.setAbajo(nodo_Y.getAcceso());
                nodo_Y.getAcceso().setArriba(nueva_celda);
                nodo_Y.setAcceso(nueva_celda);
            }else{
                var tmp2 = nodo_Y.getAcceso();
                while(tmp2 != null){
                    if(nueva_celda.coordenadaX < tmp2.coordenadaX){
                        nueva_celda.setAbajo(tmp2);
                        nueva_celda.setArriba(tmp2.getArriba());
                        tmp2.getArriba().setAbajo(nueva_celda);
                        tmp2.setArriba(nueva_celda);
                        break;
                    }else if(nueva_celda.coordenadaX == tmp2.coordenadaX && nueva_celda.coordenadaY == tmp2.coordenadaY){
                        break;
                    }else{
                        if (tmp2.getAbajo() == null){
                            tmp2.setAbajo(nueva_celda);
                            nueva_celda.setArriba(tmp2);
                            break;
                        }else{
                            tmp2 = tmp2.getAbajo();
                        }
                    }
                }
            }
        }
    }

    imprimir(){
        let Contador = 1
        let posicion = ""
        while (true){
            var inicio = new Nodo_Cabecera();
            inicio = this.filas.getCabecera(Contador);
            if (inicio == null){
                break;
            }
            var tempo = inicio;
            let posicion;
            tempo = inicio.getAcceso();
            while (tempo != null){
                posicion = tempo.coordenadaX+","+tempo.coordenadaY+","+tempo.libro+";"
                tempo = tempo.getDerecha()
                console.log(posicion)
            }
            Contador += 1
        }
            
    }

    graficarNeato(){
        var contenido = "digraph G{";
        contenido += 'node[shape=box, width=0.7, height=0.7, fontname="Arial", fillcolor="white", style=filled]'+
        'edge[style = "bold"]'+
        'graph[rankdir = "TB"]'+
        "node[label = \"capa:" + this.capa +'" fillcolor="darkolivegreen1" pos = "-1,1!"]raiz;';
        contenido += 'label = "\nMATRIZ DISPERSA" \nfontname="Arial Black" \nfontsize="25pt" \n\n';
       

        var pivote = this.filas.primero;
        var posx = 0;
        while(pivote != null){
            contenido += '\n\tnode[label = "F'+pivote.id+'" fillcolor="azure3" pos="-1,-'+posx+'!" shape=box fontsize=5]x'+pivote.id+';';
            pivote = pivote.siguiente;
            posx += 1;
        }
        pivote = this.filas.primero;
        while(pivote.siguiente != null){
            contenido+= '\n\tx'+pivote.id+'->x'+pivote.siguiente.id+';';
            contenido+= '\n\tx'+pivote.id+'->x'+pivote.siguiente.id+'[dir=back];';
            pivote = pivote.siguiente;
        }
        contenido += '\n\traiz->x'+this.filas.primero.id+';';

        var pivotey = this.columnas.primero;
        var posy = 0;

        while(pivotey != null){
            contenido += '\n\tnode[label = "C'+pivotey.id+'" fillcolor="azure3" pos="'+posy+',1!" shape=box]y'+pivotey.id+';';
            pivotey = pivotey.siguiente;
            posy += 1;
        }
        pivotey = this.columnas.primero;
        while(pivotey.siguiente != null){
            contenido+= '\n\ty'+pivotey.id+'->y'+pivotey.siguiente.id+';';
            contenido+= '\n\ty'+pivotey.id+'->y'+pivotey.siguiente.id+'[dir=back];';
            pivotey = pivotey.siguiente;
        }
        contenido += '\n\traiz->y'+this.columnas.primero.id+';';

        var pivote = this.filas.primero;
        var posx = 0;

        while (pivote != null){
            var pivote_celda = pivote.acceso;
            while (pivote_celda != null){
                var pivotey = this.columnas.primero;
                var posy_celda = 0;
                while (pivotey != null){
                    if (pivotey.id==pivote_celda.coordenadaY){
                        break;
                    }
                    posy_celda+=1;
                    pivotey = pivotey.siguiente;
                }
                contenido += '\n\tnode[label="'+pivote_celda.libro+'" fillcolor="white" pos="'+posy_celda+',-'+posx+'!" shape=box]i'+pivote_celda.coordenadaX+'_'+pivote_celda.coordenadaY+';';
                pivote_celda = pivote_celda.derecha;
            }
            pivote_celda = pivote.acceso;
            while (pivote_celda != null){
                if(pivote_celda.derecha != null){
                    contenido += '\n\ti'+pivote_celda.coordenadaX+'_'+pivote_celda.coordenadaY+'->i'+pivote_celda.derecha.coordenadaX+'_'+pivote_celda.derecha.coordenadaY+';';
                    contenido += '\n\ti'+pivote_celda.coordenadaX+'_'+pivote_celda.coordenadaY+'->i'+pivote_celda.derecha.coordenadaX+'_'+pivote_celda.derecha.coordenadaY+'[dir=back];';
                }
                pivote_celda = pivote_celda.derecha
            }
            contenido += '\n\tx'+pivote.id+'->i'+pivote.acceso.coordenadaX+'_'+pivote.acceso.coordenadaY+';';
            contenido += '\n\tx'+pivote.id+'->i'+pivote.acceso.coordenadaX+'_'+pivote.acceso.coordenadaY+'[dir=back];';
            pivote = pivote.siguiente;
            posx+=1;
        }

        pivote = this.columnas.primero;
        while (pivote != null){
            var pivote_celda = pivote.acceso;
            while (pivote_celda != null){
                if(pivote_celda.abajo != null){
                    contenido+='\n\ti'+pivote_celda.coordenadaX+'_'+pivote_celda.coordenadaY+'->i'+pivote_celda.abajo.coordenadaX+'_'+pivote_celda.abajo.coordenadaY+';';
                    contenido+='\n\ti'+pivote_celda.coordenadaX+'_'+pivote_celda.coordenadaY+'->i'+pivote_celda.abajo.coordenadaX+'_'+pivote_celda.abajo.coordenadaY+'[dir=back];';
                }
                pivote_celda = pivote_celda.abajo
            }
            contenido += '\n\ty'+pivote.id+'->i'+pivote.acceso.coordenadaX+'_'+pivote.acceso.coordenadaY+';';
            contenido += '\n\ty'+pivote.id+'->i'+pivote.acceso.coordenadaX+'_'+pivote.acceso.coordenadaY+'[dir=back];';
            pivote = pivote.siguiente;
        }
        contenido += '\n}';
         //--- se genera DOT y se procede a ecjetuar el comando
        
        console.log(contenido);

    }
}


var matrizThriller = new Matriz_Dispersa();
matrizThriller.insertar(1,1,"Libro del Dragón");
matrizThriller.insertar(1,2,"b");
matrizThriller.insertar(1,3,"c");
matrizThriller.insertar(1,4,"d");
matrizThriller.insertar(2,1,"e");
matrizThriller.insertar(2,2,"f");
matrizThriller.insertar(2,4,"g");
matrizThriller.insertar(3,2,"h");
matrizThriller.insertar(3,3,"i");
matrizThriller.imprimir();
matrizThriller.graficarNeato();



var listaUsuarios = new ListaUsuarios();
listaUsuarios.InsertarUsuario("2354168452525","Wilfred Perez","Wilfred","wilfred@gmail.com","Administrador","123","+502 (123) 123-4567");
listaUsuarios.InsertarUsuario("2354168452525","Allen Román","Allenrovas","algirova@gmail.com","Usuario","123","+502 (123) 123-4567");

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

document.getElementById("btn_regresarUsuario").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
}




