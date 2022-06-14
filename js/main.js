//Libros
class Libro{
    constructor(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria){
        this.isbn = isbn;
        this.nombre_autor = nombre_autor;
        this.nombre_libro = nombre_libro;
        this.cantidad = cantidad;
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas;
        this.categoria = categoria;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaLibros{
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.contador = 0;
    }

    InsertarLibro(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria){
        var nuevo = new Libro(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria);
        if(this.cabeza == null){
            this.cabeza = nuevo;
            this.cola = nuevo;
        }else{
            nuevo.anterior = this.cola;
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
        }
        this.contador++;
        
    }
}

class Top5Usuario{
    constructor(nombre, cantidad, usuario){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.usuario = usuario;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaTop5{
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.contador = 0;
    }
    InsertarUsuario(nombre, cantidad, usuario){
        var nuevo = new Top5Usuario(nombre, cantidad,usuario);
        if(this.cabeza == null){
            this.cabeza = nuevo;
            this.cola = nuevo;
        }else{
            nuevo.anterior = this.cola;
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
        }
        this.contador++;
        this.ordenarTop5();
    }
    
    Buscar (usuario){
        var actual = this.cabeza;
        while(actual != null){
            if(actual.usuario == usuario){
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    CambiarTop5(nombre, cantidad, usuario){
        var actual = this.cabeza;
        while(actual != null){
            if(actual.usuario == usuario){
                actual.cantidad = cantidad;
                break;
            }
            actual = actual.siguiente;
        }
    }

    ordenarTop5(){
        if(this.contador>1){
            while(true){
                var actual = this.cabeza;
                var i = null;
                var j = this.cabeza.siguiente;
                var cambio = false;
                while(j != null){
                    if(actual.cantidad > j.cantidad){
                        cambio = true;
                        if (i != null){
                            var tmp = j.siguiente;
                            i.siguiente = j;
                            j.siguiente = actual;
                            actual.siguiente = tmp;
                        }else{
                            var tmp2 = j.siguiente;
                            this.cabeza = j;
                            j.siguiente = actual;
                            actual.siguiente = tmp2;
                        }
                        i = j;
                        j = actual.siguiente;
                    }else{
                        i = actual;
                        actual = j;
                        j = j.siguiente;
                    }
                }if (!cambio){
                    break;
                }
            }
        }
    }
}

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
        return null;
    }

    imprimirUsuarios(){
        let actual = this.cabeza;
        if(actual != null){
            for (var i = 0; i < this.tamanio; i++) {
                console.log(actual);
                actual = actual.siguiente;
            }
        }
    }
}

//Matriz Dispersa
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
            }
            Contador += 1
        }
            
    }

    graficarNeato(){
        var contenido = "digraph G{";
        contenido += "layout = neato;"
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
        
        d3.select("#graficas").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido)

    }
}

//Arbol de busqueda
class Autor{
    constructor(dpi, nombre_autor, correo, telefono, direccion, biografia){
        this.dpi = dpi;
        this.nombre_autor = nombre_autor;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.biografia = biografia;
        this.izquierda = null;
        this.derecha = null;
    }

    insertar(dpi, nombre_autor, correo, telefono, direccion, biografia){
        var Prueba = 0;
        console.log(dpi);
        if(nombre_autor.localeCompare(this.nombre_autor)<0){
            if(this.izquierda == null){
                this.izquierda = new Autor(dpi, nombre_autor, correo, telefono, direccion, biografia);
            }else{
                this.izquierda.insertar(dpi, nombre_autor, correo, telefono, direccion, biografia);
            }
        }else if(nombre_autor.localeCompare(this.nombre_autor)>0){
            if(this.derecha == null){
                this.derecha = new Autor(dpi, nombre_autor, correo, telefono, direccion, biografia);
            }else{
                this.derecha.insertar(dpi, nombre_autor, correo, telefono, direccion, biografia);
            }
        }else{
            console.log("El autor ya existe");
        }
    }

    obtenerGraphivz(){
        return "digraph grafica{\n" +
               "rankdir=TB;\n" +
               "node [shape = record, style=filled, fillcolor=seashell2];\n"+
                this.getCodigoInterno()+
                "}\n";
    }
       
    getCodigoInterno(){
        var etiqueta = "";
        if(this.izquierda==null && this.derecha==null){
            etiqueta="nodo"+this.dpi+" [ label =\""+this.nombre_autor+"\"];\n";
        }else{
            etiqueta="nodo"+this.dpi+" [ label =\"<C0>|"+this.nombre_autor+"|<C1>\"];\n";
        }
        if(this.izquierda!=null){
            etiqueta=etiqueta + this.izquierda.getCodigoInterno() +
               "nodo"+this.dpi+":C0->nodo"+this.izquierda.dpi+"\n";
        }
        if(this.derecha!=null){
            etiqueta=etiqueta + this.derecha.getCodigoInterno() +
               "nodo"+this.dpi+":C1->nodo"+this.derecha.dpi+"\n";                    
        }
        return etiqueta;
    }
    
}

class Arbol{
    constructor(){
        this.raiz = null;
    }

    insertar(dpi, nombre_autor, correo, telefono, direccion, biografia){
        if(this.raiz == null){
            this.raiz = new Autor(dpi, nombre_autor, correo, telefono, direccion, biografia);
        }else{
            this.raiz.insertar(dpi, nombre_autor, correo, telefono, direccion, biografia);
        }
    }

    graficarArbol(){
        var actual;
        actual = this.raiz;
        var hola = actual.obtenerGraphivz();
        console.log(hola);
        d3.select("#graficas").graphviz()
            .width(1200)
            .height(900)
            .renderDot(hola)
    } 
}


var matrizThriller = new Matriz_Dispersa();
var matrizFantasia = new Matriz_Dispersa();
var listaUsuarios = new ListaUsuarios();
listaUsuarios.InsertarUsuario(2354168452525,"Wilfred Perez","Wilfred","wilfred@gmail.com","Administrador","123","+502 (123) 123-4567");
var listaAutores = new Arbol();
var listaLibros = new ListaLibros();

//Pagina de Login
document.getElementById("IniciarSesion").onclick=function(){
    document.getElementById("Login").style.display="block";
    document.getElementById("Index").style.display="none";
    
}

function llenarOrtogonal(){
    var i =1;
    var j =1;
    while (i <= 25){
        while (j <= 25){
            matrizFantasia.insertar(i,j,"");
            j+=1;
            
        }
        j=1;
        i+=1;
        
    }
    
}

//Entrada a Usuarios o Administracion
document.getElementById("btn_login").onclick=function(){
    
    let usuario = document.getElementById("usuarioLogin").value;
    let contrasenia = document.getElementById("usuarioContra").value;
    var usuarioEntrada = listaUsuarios.RecorrerMenu(usuario,contrasenia);
    if (usuarioEntrada != null){
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
    }else{
        alert("Usuario o contraseña incorrectos");
    }
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";


}

function leerArchivoUsuario(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarUsuarios(contenido);
    };
    lector.readAsText(archivo);
  }

function leerArchivoAutor(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarAutores(contenido);
    };
    lector.readAsText(archivo);
}

function leerArchivoLibro(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarLibros(contenido);
    }
    lector.readAsText(archivo);
}


document.getElementById('masivaUsuarios').addEventListener('change', leerArchivoUsuario, false);
document.getElementById('masivaLibros').addEventListener('change', leerArchivoLibro, false);
document.getElementById('masivaAutores').addEventListener('change', leerArchivoAutor, false);

function CargarUsuarios(contenido){
    var datos = JSON.parse(contenido);
    console.log(datos);
    for (var i = 0; i < datos.length; i++) {
        listaUsuarios.InsertarUsuario(datos[i].dpi,datos[i].nombre_completo,datos[i].nombre_usuario,datos[i].correo,datos[i].rol,datos[i].contrasenia,datos[i].telefono);
    }
    alert("Usuarios cargados");
}

function CargarLibros(contenido){
    var datos = JSON.parse(contenido);
    console.log(datos);
    for (var i = 0; i < datos.length; i++) {
        listaLibros.InsertarLibro(datos[i].isbn,datos[i].nombre_autor,datos[i].nombre_libro,datos[i].cantidad,datos[i].fila,datos[i].columna,datos[i].paginas,datos[i].categoria);
        if(datos[i].categoria == "Fantasia"){
            matrizFantasia.insertar(datos[i].fila,datos[i].columna,datos[i].nombre_libro);
        }else if(datos[i].categoria == "Thriller"){
            matrizThriller.insertar(datos[i].fila,datos[i].columna,datos[i].nombre_libro);
        }

    }
}

function CargarAutores(contenido){
    var datos = JSON.parse(contenido);
    console.log(datos);
    for (var i = 0; i < datos.length; i++) {
        listaAutores.insertar(datos[i].dpi,datos[i].nombre_autor,datos[i].correo,datos[i].telefono,datos[i].telefono,datos[i].direccion,datos[i].biografia);
    }
}

document.getElementById("btn_regresar").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
}

document.getElementById("btn_regresarAdministracion").onclick=function(){
    listaAutores.graficarArbol();
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

llenarOrtogonal();
console.log("matrizFantasia");

