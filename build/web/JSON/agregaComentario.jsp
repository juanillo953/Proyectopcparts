<%-- 
    Document   : agregaComentario
    Created on : 23-feb-2020, 11:08:43
    Author     : Juan
--%>

<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%String comp = request.getParameter("comp");
String nombreUs = request.getParameter("nombre");
String comentario = request.getParameter("comentario");
int puntuacion = Integer.parseInt(request.getParameter("puntuacion"));
Bd bd = new Bd();
bd.abrirConexion();
boolean agregado = bd.agregarComentario(comp, nombreUs, comentario, puntuacion);
String txt = "[";
if(agregado){
    txt+="{\"agregado\":\"si\"}]";
}
else{
    txt+="{\"agregado\":\"no\"}]";
}
out.print(txt);
%>
