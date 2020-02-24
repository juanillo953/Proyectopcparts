<%-- 
    Document   : marcasJSON
    Created on : 17-feb-2020, 11:01:44
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Marca"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
Bd bd = new Bd();
bd.abrirConexion();
List<Marca> marcas = bd.obtenerMarcas();
String txt = "[";
for(int contador=0;contador<marcas.size();contador++){
 txt+="{\"nombre\":\""+marcas.get(contador).getNombre()+"\"},";
}
txt = txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);
%>
