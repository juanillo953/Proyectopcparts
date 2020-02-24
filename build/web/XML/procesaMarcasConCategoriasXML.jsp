<%-- 
    Document   : procesaMarcasConCategoriasXML
    Created on : 24-feb-2020, 8:35:02
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Categoria"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%String seleccion = request.getParameter("seleccion");
seleccion = seleccion.substring(0,seleccion.length()-1);
Bd bd = new Bd();
bd.abrirConexion();
List<Categoria> categorias = bd.obtenerCategoriasMarca(seleccion);
String txt = "<categorias>";
for(int contador=0;contador<categorias.size();contador++){
    txt+="<nombre>"+categorias.get(contador).getNombre()+"</nombre>";
}
txt+="</categorias>";
out.print(txt);%>
