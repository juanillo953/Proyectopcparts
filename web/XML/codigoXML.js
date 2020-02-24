window.onload = iniciar;

function iniciar(){
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
    txt3="";
    txt4="";
    nombreProductoSeleccionado = "";
    document.getElementById("busqueda").onkeyup = consultaDatos;
    document.getElementById("enviado").onclick = enviaDatos;
    consultaMarcas();
    
    consultaCategorias();
}
function inicializa_xhr(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
function consultaDatos(){
 
    peticion_http = inicializa_xhr();
    if(peticion_http){

        var busqueda = document.getElementById("busqueda").value;

        peticion_http.onreadystatechange = procesaDatos;

        peticion_http.open("POST","componentesXML.jsp",true);
        peticion_http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        if(busqueda!=""){
            var componente = "comp="+encodeURIComponent(busqueda);
            peticion_http.send(componente);
        }
        else{
            document.getElementById("grande").innerHTML="";
        }

    }
}
function procesaDatos(){

    if(peticion_http.readyState==4){

        if(peticion_http.status==200){

            respuestaXML = peticion_http.responseXML;
            var foto = respuestaXML.getElementsByTagName("foto");
            var nombre = respuestaXML.getElementsByTagName("nombre");
            var precio = respuestaXML.getElementsByTagName("precio");
            var txt = "";
            for(contador=0;contador<foto.length;contador++){
                txt+= "<div class='compo' onclick='muestraModal(this)'><img src='"+foto[contador].firstChild.nodeValue+"' alt=''><h4>"+nombre[contador].firstChild.nodeValue+"</h4><h4 class='orange'>"+precio[contador].firstChild.nodeValue+"€</h4></div>";
            }
            document.getElementById("grande").innerHTML = txt;
        }
    }
}
function consultaMarcas(){
    peticion_http1 = inicializa_xhr();
    if(peticion_http1){

        var busqueda = document.getElementById("busqueda").value;

        peticion_http1.onreadystatechange = procesaMarcas;

        peticion_http1.open("GET","marcasXML.jsp",true);
        peticion_http1.send();


    }

}
function procesaMarcas(){
    if(peticion_http1.readyState==4){
        if(peticion_http1.status==200){
            respuestaXML = peticion_http1.responseXML;
            var nombre = respuestaXML.getElementsByTagName("nombre");
            var txt = "<h2>Marcas</h2>";
            for(contador=0;contador<nombre.length;contador++){
                txt+="<label><input type='checkbox' id='"+contador+"' value='"+nombre[contador].firstChild.nodeValue+"' onclick='seleccionaMarca()'> "+nombre[contador].firstChild.nodeValue+"</label><br>";
            }
            document.getElementById("pequeno").innerHTML = txt;
        }
    }
}
function consultaCategorias(){
    peticion_http2 = inicializa_xhr();
    if(peticion_http2){

        var busqueda = document.getElementById("busqueda").value;

        peticion_http2.onreadystatechange = procesaCategorias;

        peticion_http2.open("GET","categoriasXML.jsp",true);
        peticion_http2.send();


    }

}
function procesaCategorias(){
    if(peticion_http2.readyState==4){
        if(peticion_http2.status==200){
            respuestaXML2 = peticion_http2.responseXML;
            var nombre = respuestaXML2.getElementsByTagName("nombre");
            var txt2 = "<h2>Categorias</h2>";
            for(contador=0;contador<nombre.length;contador++){
                txt2+="<label><input type='checkbox' id='"+(contador+100)+"' value='"+nombre[contador].firstChild.nodeValue+"' onclick='seleccionaCategoria(this)'> "+nombre[contador].firstChild.nodeValue+"</label><br>";
            }
            document.getElementById("pequenoN2").innerHTML = txt2;
        }
    }
}
function seleccionaMarca(){
    var div = document.getElementById("pequeno");

    var elementos = div.getElementsByTagName("input");
    txt3="";
    for(contador=0;contador<elementos.length;contador++){
        if(elementos[contador].checked){
            txt3+="'"+elementos[contador].value+"',";
        }
    }
    peticionMarcasConCategorias();
    peticion_http3 = inicializa_xhr();
    if(peticion_http3){

        peticion_http3.onreadystatechange = procesaSeleccion;

        peticion_http3.open("POST","seleccionXML.jsp",true);
        peticion_http3.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        if(txt3!=""){
            var seleccion = "seleccion="+encodeURIComponent(txt3);
            peticion_http3.send(seleccion);
        }
        else{
            document.getElementById("grande").innerHTML="";
        }

    }
}
function procesaSeleccion(){
    if(peticion_http3.readyState==4){

        if(peticion_http3.status==200){

            respuestaXML = peticion_http3.responseXML;
            var foto = respuestaXML.getElementsByTagName("foto");
            var nombre = respuestaXML.getElementsByTagName("nombre");
            var precio = respuestaXML.getElementsByTagName("precio");
            var txt7 = "";
            for(contador=0;contador<foto.length;contador++){
                txt7+= "<div class='compo' onclick='muestraModal(this)'><img src='"+foto[contador].firstChild.nodeValue+"' alt=''><h4>"+nombre[contador].firstChild.nodeValue+"</h4><h4 class='orange'>"+precio[contador].firstChild.nodeValue+"€</h4></div>";
            }
            document.getElementById("grande").innerHTML = txt7;
        }
    }
}
function seleccionaCategoria(){
    var div = document.getElementById("pequenoN2");

    var elementos = div.getElementsByTagName("input");
    txt4="";
    for(contador=0;contador<elementos.length;contador++){
        if(elementos[contador].checked){
            txt4+="'"+elementos[contador].value+"',";
        }
    }
    peticion_http4 = inicializa_xhr();
    if(peticion_http4){

        peticion_http4.onreadystatechange = procesaSeleccionCategoria;

        peticion_http4.open("POST","seleccionCategoriasXML.jsp",true);
        peticion_http4.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        if(txt4!="" && txt3!=""){
            var seleccion = "seleccionC="+encodeURIComponent(txt4)+"&seleccionM="+encodeURIComponent(txt3);
            peticion_http4.send(seleccion);
        }
        else if(txt4!=""){
            var seleccion = "seleccionC="+encodeURIComponent(txt4);
            peticion_http4.send(seleccion);
        }
        else if(txt3!=""){
            seleccionaMarca();
        }
        else{
            document.getElementById("grande").innerHTML="";
        }

    }
}
function procesaSeleccionCategoria(){
    if(peticion_http4.readyState==4){

        if(peticion_http4.status==200){

            respuestaXML = peticion_http4.responseXML;
            var foto = respuestaXML.getElementsByTagName("foto");
            var nombre = respuestaXML.getElementsByTagName("nombre");
            var precio = respuestaXML.getElementsByTagName("precio");
            var txt6 = "";
            for(contador=0;contador<foto.length;contador++){
                txt6+= "<div class='compo' onclick='muestraModal(this)'><img src='"+foto[contador].firstChild.nodeValue+"' alt=''><h4>"+nombre[contador].firstChild.nodeValue+"</h4><h4 class='orange'>"+precio[contador].firstChild.nodeValue+"€</h4></div>";
            }
            document.getElementById("grande").innerHTML = txt6;
        }
    }
}
function peticionMarcasConCategorias(){
    peticion_http5 = inicializa_xhr();
    if(peticion_http5){

        peticion_http5.onreadystatechange = procesaMarcasConCategorias;

        peticion_http5.open("POST","procesaMarcasConCategoriasXML.jsp",true);
        peticion_http5.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        if(txt3!=""){
            var seleccion = "seleccion="+encodeURIComponent(txt3);
            peticion_http5.send(seleccion);
        }
        else{
            document.getElementById("grande").innerHTML="";
            consultaCategorias();
        }

    }
}
function procesaMarcasConCategorias(){
    if(peticion_http5.readyState==4){
        if(peticion_http5.status==200){
            respuestaXML = peticion_http5.responseXML;
            var nombre = respuestaXML.getElementsByTagName("nombre");
            var txt2 = "<h2>Categorias</h2>";
            for(contador=0;contador<nombre.length;contador++){
                txt2+="<label><input type='checkbox' id='"+(contador+100)+"' value='"+nombre[contador].firstChild.nodeValue+"' onclick='seleccionaCategoria(this)'> "+nombre[contador].firstChild.nodeValue+"</label><br>";
            }
            document.getElementById("pequenoN2").innerHTML = txt2;
        }
    }
}
function muestraModal(item){

    var modal2 = document.getElementById("modal");
    console.log(modal2);
    nombreProductoSeleccionado = item.getElementsByTagName("h4")[0].innerHTML;
    peticion_http6 = inicializa_xhr();
    if(peticion_http6){

        var busqueda = document.getElementById("busqueda").value;
        muestraComentarios();
        peticion_http6.onreadystatechange = muestraLosDatosEnModal;

        peticion_http6.open("POST","sacarDatosComponenteXML.jsp",true);
        peticion_http6.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        var componente = "comp="+encodeURIComponent(nombreProductoSeleccionado);
        peticion_http6.send(componente);


    }
    modal2.style.display="block";

    console.log(nombre);
   
}
function muestraLosDatosEnModal(){
    if(peticion_http6.readyState==4){

        if(peticion_http6.status==200){

            respuestaXML = peticion_http6.responseXML;
            var foto = respuestaXML.getElementsByTagName("foto");
            var nombre = respuestaXML.getElementsByTagName("nombre");
            var precio = respuestaXML.getElementsByTagName("precio");
            for(contador=0;contador<foto.length;contador++){
                document.getElementById("nombreProducto").innerHTML=nombre[contador].firstChild.nodeValue;
                document.getElementById("precioProducto").innerHTML=precio[contador].firstChild.nodeValue+"€";
                document.getElementById("imagenProducto").src=foto[contador].firstChild.nodeValue;
            }
        }
    }
}
function enviaDatos(){
    var nombre = document.getElementById("nombre").value;
    var comentario = document.getElementById("comentario").value;
    if(document.getElementById("radio1").checked){
        var puntuacion = 1;
    }
    else if(document.getElementById("radio2").checked){
        var puntuacion = 2;
    }
    else if(document.getElementById("radio3").checked){
        var puntuacion = 3;
    }
    else if(document.getElementById("radio4").checked){
        var puntuacion = 4;
    }
    else if(document.getElementById("radio5").checked){
        var puntuacion = 5;
    }
    
    peticion_http7 = inicializa_xhr();
    if(peticion_http7){


        peticion_http7.onreadystatechange = agregaComentario;

        peticion_http7.open("POST","agregaComentarioXML.jsp",true);
        peticion_http7.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        var componente = "comp="+encodeURIComponent(nombreProductoSeleccionado)+"&nombre="+encodeURIComponent(nombre)+"&comentario="+encodeURIComponent(comentario)+"&puntuacion="+encodeURIComponent(puntuacion);
        peticion_http7.send(componente);


    }
   
}
function agregaComentario(){
    if(peticion_http7.readyState==4){

        if(peticion_http7.status==200){

            respuestaXML = peticion_http7.responseXML;
            var respuesta = respuestaXML.getElementsByTagName("agregado");
            if(respuesta[0].firstChild.nodeValue=="si"){
                muestraComentarios();
            }else{

            }
            
        }
    }
}
function muestraComentarios(){
    console.log(nombreProductoSeleccionado);
    peticion_http8 = inicializa_xhr();
    if(peticion_http8){


        peticion_http8.onreadystatechange = mostrarComentarioModal;
        console.log("hola");
        peticion_http8.open("POST","muestraComentarioXML.jsp",true);
        peticion_http8.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        var componente = "comp="+encodeURIComponent(nombreProductoSeleccionado);
        peticion_http8.send(componente);


    }
}
function mostrarComentarioModal(){
    if(peticion_http8.readyState==4){

        if(peticion_http8.status==200){
            var txt20 = "";
            document.getElementById("comentarios").innerHTML=txt20;
            respuestaXML = peticion_http8.responseXML;
            var usuario = respuestaXML.getElementsByTagName("usuario");
            var puntos2 = respuestaXML.getElementsByTagName("puntos");
            var mensaje = respuestaXML.getElementsByTagName("mensaje") 

            var puntos = "";
            for(contador=0;contador<puntos2.length;contador++){
                if(puntos2[contador].firstChild.nodeValue==5){
                    puntos="★";
                }  
                else if(puntos2[contador].firstChild.nodeValue==4){
                    puntos="★★";
                }
                else if(puntos2[contador].firstChild.nodeValue==3){
                    puntos="★★★";
                }
                else if(puntos2[contador].firstChild.nodeValue==2){
                    puntos="★★★★";
                }
                else if(puntos2[contador].firstChild.nodeValue==1){
                    puntos="★★★★★";
                }
                
                txt20+="<div><h2>Usuario: "+usuario[contador].firstChild.nodeValue+"</h2><h5> Valoracion: "+puntos+"</h5><hr><p class='parrafo'><b>Comentario:</b><br>"+mensaje[contador].firstChild.nodeValue+"</p></div>";
            }
            document.getElementById("comentarios").innerHTML=txt20;
            
        }
    }
}


