<%-- 
    Document   : categoriasJSON
    Created on : 17-feb-2020, 11:26:22
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Categoria"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%Bd bd = new Bd();
bd.abrirConexion();
List<Categoria> categorias = bd.obtenerCategoria();
String txt = "[";
for(int contador=0;contador<categorias.size();contador++){
 txt+="{\"nombre\":\""+categorias.get(contador).getNombre()+"\"},";
}
txt = txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);
%>
