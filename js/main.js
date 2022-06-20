//Libros
class Libro{
    constructor(isbn, nombre_autor, nombre_libro, paginas, categoria){
        this.isbn = isbn;
        this.nombre_autor = nombre_autor;
        this.nombre_libro = nombre_libro;
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

    InsertarLibro(isbn, nombre_autor, nombre_libro, paginas, categoria ){
        var nuevo = new Libro(isbn, nombre_autor, nombre_libro, paginas, categoria);
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

    Tabla_Libros(){
        var respuesta = document.getElementById("tablaLibros");
        respuesta.innerHTML = "";
        var aux = this.cabeza;
        while(aux != null){
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+aux.isbn+"</td>"+
                "<td>"+aux.nombre_autor+"</td>"+
                "<td>"+aux.nombre_libro+"</td>"+
                "<td>"+aux.paginas+"</td>"+
                "<td>"+aux.categoria+"</td>"+
            "</tr>";
            aux = aux.siguiente;
        }
    }
   
    Bubble(){
        if(this.contador>1){
            var Cambio = 0;
            var i = null;
            if (this.cabeza == null){
                return;
            }
            while(true){
                Cambio = 0;
                var j = this.cabeza;
                while(j.siguiente != i){
                    if(j.nombre_libro > j.siguiente.nombre_libro){
                        var temp = j.nombre_libro;
                        var temp2 = j.isbn;
                        var temp3 = j.nombre_autor;
                        var temp4 = j.paginas;
                        var temp5 = j.categoria;
                        j.nombre_libro = j.siguiente.nombre_libro;
                        j.isbn = j.siguiente.isbn;
                        j.nombre_autor = j.siguiente.nombre_autor;
                        j.paginas = j.siguiente.paginas;
                        j.categoria = j.siguiente.categoria;
                        j.siguiente.nombre_libro = temp;
                        j.siguiente.isbn = temp2;
                        j.siguiente.nombre_autor = temp3;
                        j.siguiente.paginas = temp4;
                        j.siguiente.categoria = temp5;
                        Cambio = 1;
                    }
                    j = j.siguiente;
                }
                i = j;
                if(Cambio == 0){
                    break;
                }
            }
        }
    }

    imprimir(){
        var aux = this.cabeza;
        while(aux != null){
            console.log(aux.nombre_libro);
            aux = aux.siguiente;
        }
    }

   Particion(l,h){
        // set pivot as h element
        let x = h.nombre_libro;
          
        // similar to i = l-1 for array implementation
        let i = l.anterior;
          
        // Similar to "for (int j = l; j <= h- 1; j++)"
        for(let j=l; j!=h; j=j.siguiente)
        {
            if(j.nombre_libro >= x)
            {
                // Similar to i++ for array
                i = (i == null) ? l : i.siguiente;
                let temp = i.nombre_libro;
                let temp2 = i.isbn;
                let temp3 = i.nombre_autor;
                let temp4 = i.paginas;
                let temp5 = i.categoria;

                i.nombre_libro = j.nombre_libro;
                i.isbn = j.isbn;
                i.nombre_autor = j.nombre_autor;
                i.paginas = j.paginas;
                i.categoria = j.categoria;

                j.nombre_libro = temp;
                j.isbn = temp2;
                j.nombre_autor = temp3;
                j.paginas = temp4;
                j.categoria = temp5;
            }
        }
        i = (i == null) ? l : i.siguiente;  // Similar to i++
        let temp = i.nombre_libro;
        let temp2 = i.isbn;
        let temp3 = i.nombre_autor;
        let temp4 = i.paginas;
        let temp5 = i.categoria;
        i.nombre_libro = h.nombre_libro;
        i.isbn = h.isbn;
        i.nombre_autor = h.nombre_autor;
        i.paginas = h.paginas;
        i.categoria = h.categoria;
        h.nombre_libro = temp;
        h.isbn = temp2;
        h.nombre_autor = temp3;
        h.paginas = temp4;
        h.categoria = temp5;
        return i;
    }

    Sort(cabeza,cola){
        if(cola != null && cabeza != cola && cabeza != cola.siguiente){
            var temp = this.Particion(cabeza,cola);
            this.Sort(cabeza,temp.anterior);
            this.Sort(temp.siguiente,cola);
        }
    }  
}

class Top5Usuario{
    constructor(nombre, usuario){
        this.nombre = nombre;
        this.cantidad = 0;
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
    InsertarUsuario(nombre, usuario){
        var nuevo = new Top5Usuario(nombre,usuario);
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

    CambiarTop5(usuario){
        var actual = this.cabeza;
        while(actual != null){
            if(actual.usuario == usuario){
                actual.cantidad += 1;
                break;
            }
            actual = actual.siguiente;
        }
    }

    ordenarTop5(){
        if(this.contador>1){
            var Cambio = 0;
            var i = null;
            if (this.cabeza == null){
                return;
            }
            while(true){
                Cambio = 0;
                var j = this.cabeza;
                while(j.siguiente != i){
                    if(j.cantidad < j.siguiente.cantidad){
                        var temp = j.cantidad;
                        var temp2 = j.usuario;
                        var temp3 = j.nombre;
                        j.cantidad = j.siguiente.cantidad;
                        j.usuario = j.siguiente.usuario;
                        j.nombre = j.siguiente.nombre;
                        j.siguiente.cantidad = temp;
                        j.siguiente.usuario = temp2;
                        j.siguiente.nombre = temp3;
                        Cambio = 1;
                    }
                    j = j.siguiente;
                }
                i = j;
                if(Cambio == 0){
                    break;
                }
            }
        }
    }

    graficarTop5(){
        var contenido = "";
        contenido += "digraph G {\n"+
        "bgcolor=\"none\" label=\"Top de clientes\"layout=dot \n"+
        "node [shape=record, style=filled, fontcolor = white,color=black, fillcolor=darkgoldenrod2];\n"
        var actual = this.cabeza;
        var nombreNodos = "";
        var conexiones = "";

        while(actual != null){
            nombreNodos += "nodo"+actual.usuario+'[label=\"'+"Nombre: "+actual.nombre+' \n'+"Cantidad: "+actual.cantidad+'\n"];\n';
            if(actual.siguiente != null){
                conexiones += "nodo"+actual.usuario+"->nodo"+actual.siguiente.usuario+"[dir=both];\n";
            }    
            actual = actual.siguiente;
        }
        contenido += nombreNodos;
        contenido += conexiones;
        contenido += "rankdir=LR;\n}";
        
        d3.select("#Top_Usuarios").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido)
        
    }

    TablaTop5(){
        var respuesta = document.getElementById("tablaTop5");
        respuesta.innerHTML = "";
        var aux = this.cabeza;
        while(aux != null){
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+aux.nombre+"</td>"+
                "<td>"+aux.cantidad+"</td>"+
            "</tr>";
            aux = aux.siguiente;
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
        this.cantidad=0;
        this.siguiente=null;
    }
}

//ListasUsuarios
class ListaUsuarios{
    constructor(){
        this.cabeza = null;
        this.ultimo = null;
        this.tamanio = 0;
        this.tamanioLibros = 0;
    }
    //Agregar Usuario
    InsertarUsuario(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono){
        var nuevo = new Usuario(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono);
        if(this.cabeza == null){
            this.cabeza = nuevo;
            this.ultimo = nuevo;
            this.tamanio++;
        }else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
            this.ultimo.siguiente = this.cabeza.siguiente;
            this.tamanio++;
        }
        
    }
    //Insertar Libros
    InsertarLibros(nombre,usuario){
        var temporarlusuario = this.cabeza;
        while(temporarlusuario != null){
            if (temporarlusuario.nombre_usuario == usuario){
                var nuevoLibro = new LibrosUsuarios(nombre,usuario);
                nuevoLibro.cantidad = this.tamanioLibros;
                var inicioLibros = temporarlusuario.abajo;
                temporarlusuario.abajo = nuevoLibro;
                nuevoLibro.siguiente = inicioLibros;
                this.tamanioLibros++;
                break;
            }
            temporarlusuario = temporarlusuario.siguiente;
        }
        
        //No se encontró usuario
    }
    //Buscar Usuario
    BuscarUsuario(usuario){
        var actual = this.cabeza;
        if(actual != null){
            for (var i = 0; i < this.tamanio; i++) {
                if(actual.nombre_usuario == usuario){
                    return actual;
                }
                actual = actual.siguiente;
            }
        }
        return null;
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

    graficarExtra(actual){
        var nodo = actual;
        var contenido = "";
        var Nodos = "";
        var conexiones = "";
        contenido += "subgraph cluster_"+nodo.dpi+nodo.nombre_usuario+"{\n"+
        "style=filled;"+
        "color=lightgrey;"+
        "node [style=filled,color=white];";
        var auxiliar = nodo.abajo;
        while(auxiliar != null){
            Nodos += "nodo"+auxiliar.cantidad+nodo.nombre_usuario+'[label=\"'+"Nombre: "+auxiliar.nombre+'\n"];\n';
            if(auxiliar.siguiente != null){
                conexiones += "nodo"+auxiliar.cantidad+nodo.nombre_usuario+"->nodo"+auxiliar.siguiente.cantidad+nodo.nombre_usuario+";\n";
            }
            auxiliar = auxiliar.siguiente;
        }
        contenido += Nodos;
        contenido += conexiones;
        contenido += "\n}";
        return contenido;
    }

    graficarUsuarios(){
        var contenido = "";
        contenido += "digraph G {\n"+
        'bgcolor=\"none\" layout=dot label="Lista_Libros" \n'+
        "node [shape=square,fontname=\"Century Gothic\", style=filled, color=black, fillcolor=\"#f0b35d\"];\n"
        


        var actual = this.cabeza;
        var nombreNodos = "";
        var conexiones = "";
        var UsuarioCabeza = this.cabeza.dpi;
        var cont = 0;
        var subgrafo = "";
        var conexsubgrafo = "";
        if (actual != null){
            while(cont < this.tamanio){
                if(cont == this.tamanio-1){
                    nombreNodos += "nodo"+actual.dpi+"[fillcolor=\"#f9c74f\" label=\" Nombre: "+ actual.nombre_completo + "\"];\n";
                    var aux = actual;
                    if (actual.abajo != null){
                        subgrafo += this.graficarExtra(actual);
                        conexsubgrafo += "nodo"+actual.dpi+"->nodo"+actual.abajo.cantidad+actual.nombre_usuario+";\n";
                    }
                    break;
                }else{
                    nombreNodos += "nodo"+actual.dpi+"[fillcolor=\"#f9c74f\" label=\" Nombre: "+ actual.nombre_completo + "\"];\n";
                    conexiones += "nodo"+actual.dpi+"->nodo"+actual.siguiente.dpi+";\n";
                    var aux = actual;
                    if (actual.abajo != null){
                        subgrafo += this.graficarExtra(actual);
                        conexsubgrafo += "nodo"+actual.dpi+"->nodo"+actual.abajo.cantidad+actual.nombre_usuario+";\n";
                    } 
                }
                actual = actual.siguiente;
                cont++;
                
            }
        }
        conexiones += "nodo"+aux.dpi+"->nodo"+UsuarioCabeza+";\n";
        contenido += nombreNodos;
        contenido += conexiones;
        contenido += subgrafo;
        contenido += conexsubgrafo;

        var actual = this.cabeza;
        var contador = 0;
        
        contenido += "rankdir="+'"LR"'+ ";\n";
        contenido += 'label=\"Lista de Usuarios\"'+";\n";
        contenido += "}\n";
        d3.select("#Lista_Listas_Usuarios").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido)
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
        this.tipo = tipo;
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
            if (nuevo.id < this.primero.id){
                nuevo.siguiente = this.primero;
                this.primero.anterior = nuevo;
                this.primero = nuevo;
            }else if(nuevo.id > this.ultimo.id){
                this.ultimo.siguiente = nuevo;
                nuevo.anterior = this.ultimo;
                this.ultimo = nuevo;
            }else{
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
        this.pila = new Lista_Pila();
        this.arriba = null;
        this.abajo = null;
        this.izquierda = null;
        this.derecha = null;
    }
    agregarPila(pila){
        this.pila.insertar(pila);
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
        var Contador = 0;
        while (Contador <= 25){
            Contador += 1;
            try{
                var Nodo = this.filas.getCabecera(Contador).getAcceso();
            }catch(e){
                console.log("No se ha encontrado el libro aún");
            }
            while (Nodo != null){
                console.log("X: " + Nodo.coordenadaX + " Y: " + Nodo.coordenadaY + " Libro: " + Nodo.pila);
                console.log(Nodo.pila.contar());
                Nodo = Nodo.getDerecha();
            }
            
        }
    }

    modificar(fila,columna,libro){
        var Nodo = this.filas.getCabecera(fila).getAcceso();
        while (Nodo != null){
            if (Nodo.coordenadaX == fila && Nodo.coordenadaY == columna){
                Nodo.libro = libro;
                break;
            }
            Nodo = Nodo.getDerecha();
        }
    }

    agregarPilaMatriz(fila,columna,libro,cantidad){
        var Nodo = this.filas.getCabecera(fila).getAcceso();
        while (Nodo != null){
            if (Nodo.coordenadaX == fila && Nodo.coordenadaY == columna){
                for (var j = 0; j < cantidad; j++) {
                    Nodo.pila.insertar(libro);
                }
                break;
            }
            Nodo = Nodo.getDerecha();
        }
    }

    comprarLibro(libro,cliente){
        var Contador = 0;
        var Comprobacion = false;
        while (Contador <= 25){
            Contador += 1;
            try{
                var Nodo = this.filas.getCabecera(Contador).getAcceso();
            }catch(e){
                console.log("No se ha encontrado el libro aún");
            }
            while (Nodo != null){
                if (Nodo.libro == libro){
                    var cantidad = Nodo.pila.contar();
                    
                    if (cantidad > 0){
                        cantidad = cantidad - 1;
                        Nodo.pila.eliminar();
                        listaUsuarios.InsertarLibros(libro,cliente);
                        var buscar = Lista_Top5.Buscar(cliente);
                        if (buscar == null){
                            var actual = listaUsuarios.BuscarUsuario(cliente);
                            Lista_Top5.InsertarUsuario(actual.nombre_completo,cliente);
                            Lista_Top5.CambiarTop5(cliente);
                        }else{
                            Lista_Top5.CambiarTop5(cliente);
                        }
                        Lista_Top5.ordenarTop5();
                        Lista_Top5.graficarTop5();
                        Lista_Top5.TablaTop5();
                    }else{
                        var auxiliar = listaUsuarios.BuscarUsuario(cliente);
                        librosEnCola.insertar(libro,auxiliar.nombre_completo);
                        librosEnCola.graficarCola();
                    }
                    Comprobacion = true;
                    break;
                }
                Nodo = Nodo.getDerecha();
            }if(Comprobacion == true){
                break;
            }
        }

    }

    buscar(libro){
        var Contador = 0;
        var contenido = "";
        var res = document.querySelector("#Pila_Libros");
        var Comprobacion = false;
        while (Contador<=25){        
            Contador += 1;
            try{
                var Nodo = this.filas.getCabecera(Contador).getAcceso();
            }catch(e){
                console.log("No existe");
            }
            while (Nodo != null){
                if (Nodo.libro == libro){
                    var cantidad = Nodo.pila.contar();
                    contenido +=
                    '<table tex-align="center">'+
                    "<thead>"+
                    "<tr>"+'<th colspan="1"style="background-color: #cca000; color: white;">'+"Pila de "+libro+'</th>'+
                    "</tr></thead>"+
                    "<tbody>"
                    for (var i = 0; i < cantidad; i++) {
                        contenido +="<tr>"+"<td>Libro "+(i+1)+"</td>"+"</tr>"
                        
                    }        
                    contenido += "</tbody>"+"</table><br><br></br></br>"
                    res.innerHTML = contenido;
                    Comprobacion = true;
                    break;
                }
                Nodo = Nodo.getDerecha();
            }if(Comprobacion == true){
                break;
            }
        }
    }

    graficarNeato(){
        var contenido = "digraph G{";
        contenido += 'layout = neato;\n bgcolor="none";\n';
        contenido += 'node[shape=box, width=0.7, height=0.7, fontname="Arial", fillcolor="white", style=filled]'+
        'edge[style = "bold"]'+
        'graph[rankdir = "TB"]'+
        "node[label = \"Raíz" + " " +'"  fillcolor="lightblue" pos = "-1,1!"]raiz;';
        contenido += 'label = "\nMATRIZ" \nfontname="Arial Black" \nfontsize="25pt" \n\n';
       

        var pivote = this.filas.primero;
        var posx = 0;
        while(pivote != null){
            contenido += '\n\tnode[label = "Fila '+pivote.id+'" fillcolor="azure3" pos="-1,-'+posx+'!" shape=box fontsize=9]x'+pivote.id+';';
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
            contenido += '\n\tnode[label = "Columna '+pivotey.id+'" fillcolor="azure3" pos="'+posy+',1!" shape=box]y'+pivotey.id+';';
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
        
        return contenido;

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
               'rankdir=TB;\n label="Arbol Binario Autores";\nfontsize="50";\n bgcolor="none";\n' +
               'node [ style=filled , fillcolor=darkgoldenrod2];\n'+
                this.getCodigoInterno()+
                "}\n";
    }
       
    getCodigoInterno(){
        var etiqueta = "";
        if(this.izquierda==null && this.derecha==null){
            etiqueta="nodo"+this.dpi+" [ label =\""+this.nombre_autor+"\"];\n";
        }else{
            etiqueta="nodo"+this.dpi+" [ label =\""+this.nombre_autor+"\"];\n";
        }
        if(this.izquierda!=null){
            etiqueta=etiqueta + this.izquierda.getCodigoInterno() +
               "nodo"+this.dpi+"->nodo"+this.izquierda.dpi+"\n";
        }
        if(this.derecha!=null){
            etiqueta=etiqueta + this.derecha.getCodigoInterno() +
               "nodo"+this.dpi+"->nodo"+this.derecha.dpi+"\n";                    
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
        d3.select("#Arbol_Binario").graphviz()
            .width(1200)
            .height(900)
            .renderDot(hola)
    } 

    inorden(){
        var res =document.querySelector("#tablaAutores");
        res.innerHTML = "";
        this.inordenAux(this.raiz,res);
    }
    inordenAux(nodo,res){
        var respuesta = res;
        if(nodo != null){
            this.inordenAux(nodo.izquierda,respuesta);
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+nodo.dpi+"</td>"+
                "<td>"+nodo.nombre_autor+"</td>"+
                "<td>"+nodo.correo+"</td>"+
                "<td>"+nodo.telefono+"</td>"+
                "<td>"+nodo.direccion+"</td>"+
                "<td>"+nodo.biografia+"</td>"+
            "</tr>";
            this.inordenAux(nodo.derecha,respuesta);
        }
    }

    buscar(nombre){
        this.buscarAux(this.raiz,nombre);
    }
    buscarAux(nodo,nombre){
        if(nodo != null){
            this.buscarAux(nodo.izquierda,nombre);
            if(nodo.nombre_autor.localeCompare(nombre)==0){
                var res =document.querySelector("#tablaAutores");
                res.innerHTML = "";
                res.innerHTML +=
                "<tr>"+
                    "<td>"+nodo.dpi+"</td>"+
                    "<td>"+nodo.nombre_autor+"</td>"+
                    "<td>"+nodo.correo+"</td>"+
                    "<td>"+nodo.telefono+"</td>"+
                    "<td>"+nodo.direccion+"</td>"+
                    "<td>"+nodo.biografia+"</td>"+
                "</tr>";
                return;
            }
            this.buscarAux(nodo.derecha,nombre);
        }
    }

}

//Pila
class NodoPila{
    constructor(libro){
        this.libro = libro;
        this.siguiente = null;
    }
}

class Lista_Pila{
    constructor(){
        this.primero = null;
        this.tamanio = 0;
    }

    insertar(libro){
        var nuevo = new NodoPila(libro);
        nuevo.libro = libro;
        if(this.primero == null){
            nuevo.siguiente = null;
            this.primero = nuevo;
        }else{
            nuevo.siguiente = this.primero;
            this.primero = nuevo;
        }
        this.tamanio++;
    }

    eliminar(){
        var auxiliar = this.primero;
        auxiliar.siguiente = null;
        auxiliar = null;
        this.tamanio--;
    }

    contar(){
        return this.tamanio;
    }
}

//Cola
class NodoCola{
    constructor(libro,cliente){
        this.libro = libro;
        this.cliente = cliente;
        this.codigoCliente = 0;
        this.codigoLibro = null;
        this.siguiente = null;
        
    }
}

class Lista_Cola{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.contador = 0;
    }
    insertar(libro,cliente){
        var nuevo = new NodoCola(libro,cliente);
        nuevo.libro = libro;
        nuevo.cliente = cliente;
        nuevo.codigoCliente = this.contador;
        if(this.primero == null){
            nuevo.siguiente = null;
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
        }
        this.contador++;
    }
    graficarCola(){
        var contenido = "";
        contenido += "digraph G {\n"+
        "bgcolor=\"none\" label=\"Cola de Clientes\"layout=dot \n"+
        "node [shape=record, style=filled, fontcolor = white,color=black, fillcolor=dimgrey];"

        var nombreNodos = "";
        var conexiones = "";
        var actual = this.primero;

        while(actual != null){
            nombreNodos += "nodo"+actual.codigoCliente+'[label=\"Nombre: '+actual.cliente+"\n Libro: "+actual.libro+'"];\n';
            if(actual.siguiente != null){
                conexiones += "nodo"+actual.codigoCliente+"->nodo"+actual.siguiente.codigoCliente+";\n";
            }
            actual=actual.siguiente;
        }

        contenido += nombreNodos;
        contenido += conexiones;
        contenido += "\n}";



        d3.select("#Cola_Disponibilidad").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido)

    }
    
}

var matrizThriller = new Matriz_Dispersa();
var matrizFantasia = new Matriz_Dispersa();
var listaUsuarios = new ListaUsuarios();
var librosEnCola = new Lista_Cola();
var Lista_Top5 = new ListaTop5();
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
    listaUsuarios.graficarUsuarios();
    
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
    for (var i = 0; i < datos.length; i++) {
        listaUsuarios.InsertarUsuario(datos[i].dpi,datos[i].nombre_completo,datos[i].nombre_usuario,datos[i].correo,datos[i].rol,datos[i].contrasenia,datos[i].telefono);
    }
    listaUsuarios.graficarUsuarios();
    alert("Usuarios cargados");
}

function CargarLibros(contenido){
    var datos = JSON.parse(contenido);
    for (var i = 0; i < datos.length; i++) {
        listaLibros.InsertarLibro(datos[i].isbn,datos[i].nombre_autor,datos[i].nombre_libro,datos[i].paginas,datos[i].categoria);
        if(datos[i].categoria == "Fantasia"){
            matrizFantasia.modificar(datos[i].fila,datos[i].columna,datos[i].nombre_libro);
            matrizFantasia.agregarPilaMatriz(datos[i].fila,datos[i].columna,datos[i].nombre_libro,datos[i].cantidad);
        }
    }
    for (var i = 0; i < datos.length; i++) {
        if(datos[i].categoria == "Thriller"){
            matrizThriller.insertar(datos[i].fila,datos[i].columna,datos[i].nombre_libro);
            matrizThriller.agregarPilaMatriz(datos[i].fila,datos[i].columna,datos[i].nombre_libro,datos[i].cantidad);
        }
    }
   try{
        var contenido_fantasia= matrizFantasia.graficarNeato();
        d3.select("#Clasificacion_Fantasia").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido_fantasia)
        d3.select("#Logico_Fantasia").graphviz()
        .width(1200)
        .height(900)
        .renderDot(contenido_fantasia)
    }catch(error){
        console.error(error);
    }
    try{
        var contenido_thriller= matrizThriller.graficarNeato();
        d3.select("#Clasificacion_Thriller").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido_thriller)
        d3.select("#Logico_Thriller").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido_thriller)
    }catch(error){
        console.error(error);
    }
    listaLibros.Bubble();
    listaLibros.Tabla_Libros();
    matrizThriller.imprimir();
    
}

function CargarAutores(contenido){
    var datos = JSON.parse(contenido);
    for (var i = 0; i < datos.length; i++) {
        listaAutores.insertar(datos[i].dpi,datos[i].nombre_autor,datos[i].correo,datos[i].telefono,datos[i].direccion,datos[i].biografia);
    }
    alert("Autores cargados");
    try{
        listaAutores.graficarArbol();
        listaAutores.inorden();
    }catch(error){
        console.error(error);
    }
}

document.getElementById("btn_regresar").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";
}

document.getElementById("btn_autor").onclick=function(){
    document.getElementById("btn_autor").style.display="none";
    document.getElementById("form-libros").style.display="none";
    document.getElementById("form-librera").style.display="none";
    document.getElementById("form-autor").style.display="block";
    document.getElementById("btn_libros").style.display="flex";
    document.getElementById("btn_librera").style.display="flex";
}

document.getElementById("btn_libros").onclick=function(){
    document.getElementById("btn_libros").style.display="none";
    document.getElementById("form-libros").style.display="block";
    document.getElementById("form-librera").style.display="none";
    document.getElementById("form-autor").style.display="none";
    document.getElementById("btn_autor").style.display="flex";
    document.getElementById("btn_librera").style.display="flex";
}

document.getElementById("btn_librera").onclick=function(){
    document.getElementById("btn_librera").style.display="none";
    document.getElementById("form-libros").style.display="none";
    document.getElementById("form-librera").style.display="block";
    document.getElementById("form-autor").style.display="none";
    document.getElementById("btn_autor").style.display="flex";
    document.getElementById("btn_libros").style.display="flex";
}


document.getElementById("btn_regresarAdministracion").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";
    
}

document.getElementById("btn_ResetearAutor").onclick=function(){
    listaAutores.inorden();
}

document.getElementById("btn_BuscarAutor").onclick=function(){
    listaAutores.buscar(document.getElementById("buscarAutor").value);
}

document.getElementById("btn_regresarUsuario").onclick=function(){
    document.getElementById("Login").style.display="none";
    document.getElementById("Index").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("PaginaUsuario").style.display="none";
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";
}

document.getElementById("btn_BuscarLibro").onclick=function(){
    try{
        matrizFantasia.buscar(document.getElementById("buscarLibro").value);
        matrizThriller.buscar(document.getElementById("buscarLibro").value);
    }catch(error){
        console.error(error);
    }

}

document.getElementById("btn_ordenarDescendente").onclick=function(){
    listaLibros.Sort(listaLibros.cabeza,listaLibros.cola);
    listaLibros.Tabla_Libros();
    document.getElementById("Ordenamiento_Quicksort").style.display="block";
    document.getElementById("Ordenamiento_Burbuja").style.display="none";
}

document.getElementById("btn_ordenarAscendente").onclick=function(){
    listaLibros.Bubble();
    listaLibros.Tabla_Libros();
    document.getElementById("Ordenamiento_Quicksort").style.display="none";
    document.getElementById("Ordenamiento_Burbuja").style.display="block";

}

document.getElementById("btn_ComprarLibro").onclick=function(){
    try{
        matrizFantasia.comprarLibro(document.getElementById("comprarLibro").value,document.getElementById("usuarioLogin").value);
        matrizThriller.comprarLibro(document.getElementById("comprarLibro").value,document.getElementById("usuarioLogin").value);
    }catch(error){
        console.error(error);
    }
}

llenarOrtogonal();
