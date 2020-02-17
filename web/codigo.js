window.onload = iniciar;

function iniciar(){
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
                txt+= "<div class='compo'><img src='"+respuesta[contador].foto+"' alt=''><h4>"+respuesta[contador].nombre+"</h4><h4 class='orange'>"+respuesta[contador].precio+"€</h4></div>";
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
            var txt = "";
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
            var txt2 = "";
            for(contador=0;contador<respuesta2.length;contador++){
                console.log(respuesta2[contador].nombre);
                txt2+="<label><input type='checkbox' id='"+(contador+100)+"' value='"+respuesta2[contador].nombre+"' onclick='seleccionaMarca(this)'> "+respuesta2[contador].nombre+"</label><br>";
            }
            document.getElementById("pequenoN2").innerHTML = txt2;
        }
    }
}
function seleccionaMarca(){
    var div = document.getElementById("pequeno");

    var elementos = div.getElementsByTagName("input");
    var txt3="";
    for(contador=0;contador<elementos.length;contador++){
        if(elementos[contador].checked){
            txt3+="'"+elementos[contador].value+"',";
        }
    }
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
            var txt4 = "";
            for(contador=0;contador<respuesta.length;contador++){
                txt4+= "<div class='compo'><img src='"+respuesta[contador].foto+"' alt=''><h4>"+respuesta[contador].nombre+"</h4><h4 class='orange'>"+respuesta[contador].precio+"€</h4></div>";
            }
            document.getElementById("grande").innerHTML = txt4;
        }
    }
}

