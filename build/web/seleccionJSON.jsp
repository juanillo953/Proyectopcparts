<%-- 
    Document   : seleccionJSON
    Created on : 17-feb-2020, 11:56:09
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>

<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%String seleccion = request.getParameter("seleccion");
seleccion = seleccion.substring(0,seleccion.length()-1);
Bd bd = new Bd();
bd.abrirConexion();
List<Componente> componentes = bd.obtenerComponentesLista(seleccion);
String txt = "[";
for(int contador=0;contador<componentes.size();contador++){
txt+="{\"nombre\":\""+componentes.get(contador).getNombre()+"\",\"descripcion\":\""+componentes.get(contador).getDescripcion()+"\",\"precio\":\""+componentes.get(contador).getPrecio()+"\",\"foto\":\""+componentes.get(contador).getFoto() +"\"},";

}
txt= txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);
%>
