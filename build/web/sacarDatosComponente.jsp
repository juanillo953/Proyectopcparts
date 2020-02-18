<%-- 
    Document   : sacarDatosComponente
    Created on : 18-feb-2020, 11:24:37
    Author     : Juan
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%String nombre = request.getParameter("componente");
Bd bd = new Bd();
bd.abrirConexion();
List<Componente> componente = bd.obtenerComponentesNombre(nombre);
String txt = "[";
for(int contador=0;contador<componente.size();contador++){
txt+="{\"nombre\":\""+componente.get(contador).getNombre()+"\",\"descripcion\":\""+componente.get(contador).getDescripcion()+"\",\"precio\":\""+componente.get(contador).getPrecio()+"\",\"foto\":\""+componente.get(contador).getFoto() +"\"},";

}
txt= txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);%>
