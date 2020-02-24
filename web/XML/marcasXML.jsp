<%-- 
    Document   : marcasXML
    Created on : 24-feb-2020, 8:31:28
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Marca"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%
Bd bd = new Bd();
bd.abrirConexion();
List<Marca> marcas = bd.obtenerMarcas();
String txt = "<marcas>";
for(int contador=0;contador<marcas.size();contador++){
    txt+="<nombre>"+marcas.get(contador).getNombre()+"</nombre>";
}
txt+="</marcas>";
out.print(txt);
%>
