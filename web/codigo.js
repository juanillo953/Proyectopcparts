window.onload = iniciar;

function iniciar(){
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
      }
    txt3="";
    txt4="";
    document.getElementById("busqueda").onkeyup = consultaDatos;
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

        peticion_http.open("POST","componentesJSON.jsp",true);
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

            respuestaJSON = peticion_http.responseText;
            var respuesta = JSON.parse(respuestaJSON);
            var txt = "";
            for(contador=0;contador<respuesta.length;contador++){
                txt+= "<div class='compo' onclick='muestraModal(this)'><img src='"+respuesta[contador].foto+"' alt=''><h4>"+respuesta[contador].nombre+"</h4><h4 class='orange'>"+respuesta[contador].precio+"€</h4></div>";
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

        peticion_http1.open("GET","marcasJSON.jsp",true);
        peticion_http1.send();


    }

}
function procesaMarcas(){
    if(peticion_http1.readyState==4){
        if(peticion_http1.status==200){
            respuestaJSON = peticion_http1.responseText;
            var respuesta = JSON.parse(respuestaJSON);
            var txt = "<h2>Marcas</h2>";
            for(contador=0;contador<respuesta.length;contador++){
                console.log(respuesta[contador].nombre);
                txt+="<label><input type='checkbox' id='"+contador+"' value='"+respuesta[contador].nombre+"' onclick='seleccionaMarca()'> "+respuesta[contador].nombre+"</label><br>";
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

        peticion_http2.open("GET","categoriasJSON.jsp",true);
        peticion_http2.send();


    }

}
function procesaCategorias(){
    if(peticion_http2.readyState==4){
        if(peticion_http2.status==200){
            respuestaJSON2 = peticion_http2.responseText;
            var respuesta2 = JSON.parse(respuestaJSON2);
            var txt2 = "<h2>Categorias</h2>";
            for(contador=0;contador<respuesta2.length;contador++){
                console.log(respuesta2[contador].nombre);
                txt2+="<label><input type='checkbox' id='"+(contador+100)+"' value='"+respuesta2[contador].nombre+"' onclick='seleccionaCategoria(this)'> "+respuesta2[contador].nombre+"</label><br>";
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

        peticion_http3.open("POST","seleccionJSON.jsp",true);
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

            respuestaJSON = peticion_http3.responseText;
            var respuesta = JSON.parse(respuestaJSON);
            var txt7 = "";
            for(contador=0;contador<respuesta.length;contador++){
                txt7+= "<div class='compo' onclick='muestraModal(this)'><img src='"+respuesta[contador].foto+"' alt=''><h4>"+respuesta[contador].nombre+"</h4><h4 class='orange'>"+respuesta[contador].precio+"€</h4></div>";
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

        peticion_http4.open("POST","seleccionCategoriasJSON.jsp",true);
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

            respuestaJSON = peticion_http4.responseText;
            var respuesta = JSON.parse(respuestaJSON);
            var txt6 = "";
            for(contador=0;contador<respuesta.length;contador++){
                txt6+= "<div class='compo' onclick='muestraModal(this)'><img src='"+respuesta[contador].foto+"' alt=''><h4>"+respuesta[contador].nombre+"</h4><h4 class='orange'>"+respuesta[contador].precio+"€</h4></div>";
            }
            document.getElementById("grande").innerHTML = txt6;
        }
    }
}
function peticionMarcasConCategorias(){
    peticion_http5 = inicializa_xhr();
    if(peticion_http5){

        peticion_http5.onreadystatechange = procesaMarcasConCategorias;

        peticion_http5.open("POST","procesaMarcasConCategoriasJSON.jsp",true);
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
            respuestaJSON2 = peticion_http5.responseText;
            var respuesta2 = JSON.parse(respuestaJSON2);
            var txt2 = "<h2>Categorias</h2>";
            for(contador=0;contador<respuesta2.length;contador++){
                console.log(respuesta2[contador].nombre);
                txt2+="<label><input type='checkbox' id='"+(contador+100)+"' value='"+respuesta2[contador].nombre+"' onclick='seleccionaCategoria(this)'> "+respuesta2[contador].nombre+"</label><br>";
            }
            document.getElementById("pequenoN2").innerHTML = txt2;
        }
    }
}
function muestraModal(item){

    var modal2 = document.getElementById("modal");
    console.log(modal2);
    var nombre = item.getElementsByTagName("h4")[0].innerHTML;
    peticion_http6 = inicializa_xhr();
    if(peticion_http6){

        var busqueda = document.getElementById("busqueda").value;

        peticion_http6.onreadystatechange = muestraLosDatosEnModal;

        peticion_http6.open("POST","sacarDatosComponente.jsp",true);
        peticion_http6.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        var componente = "comp="+encodeURIComponent(nombre);
        peticion_http6.send(componente);


    }
    modal2.style.display="block";

    console.log(nombre);
   
}
function muestraLosDatosEnModal(){
    if(peticion_http6.readyState==4){

        if(peticion_http6.status==200){

            respuestaJSON = peticion_http6.responseText;
            var respuesta = JSON.parse(respuestaJSON);
            for(contador=0;contador<respuesta.length;contador++){
                document.getElementById("nombreProducto").innerHTML=respuesta[contador].nombre;
                document.getElementById("precioProducto").innerHTML=respuesta[contador].precio+"€";
                document.getElementById("imagenProducto").src=respuesta[contador].foto;
            }
        }
    }
}


