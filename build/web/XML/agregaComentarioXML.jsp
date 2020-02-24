<%-- 
    Document   : agregaComentarioXML
    Created on : 24-feb-2020, 8:26:04
    Author     : Alumno_2DAW
--%>

<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%String comp = request.getParameter("comp");
String nombreUs = request.getParameter("nombre");
String comentario = request.getParameter("comentario");
int puntuacion = Integer.parseInt(request.getParameter("puntuacion"));
Bd bd = new Bd();
bd.abrirConexion();
boolean agregado = bd.agregarComentario(comp, nombreUs, comentario, puntuacion);
String txt = "";
if(agregado){
    txt+="<agregado>si</agregado>";
}
else{
    txt+="<agregado>no</agregado>";
}
out.print(txt);
%>
