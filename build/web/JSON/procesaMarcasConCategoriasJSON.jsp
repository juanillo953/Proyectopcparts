<%-- 
    Document   : procesaMarcasConCategoriasJSON
    Created on : 18-feb-2020, 10:36:36
    Author     : Juan
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Categoria"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%String seleccion = request.getParameter("seleccion");
seleccion = seleccion.substring(0,seleccion.length()-1);
Bd bd = new Bd();
bd.abrirConexion();
List<Categoria> categorias = bd.obtenerCategoriasMarca(seleccion);
String txt = "[";
for(int contador=0;contador<categorias.size();contador++){
 txt+="{\"nombre\":\""+categorias.get(contador).getNombre()+"\"},";
}
txt = txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);%>
