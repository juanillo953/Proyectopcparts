<%-- 
    Document   : seleccionXML
    Created on : 24-feb-2020, 8:40:41
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>

<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%String seleccion = request.getParameter("seleccion");
seleccion = seleccion.substring(0,seleccion.length()-1);
Bd bd = new Bd();
bd.abrirConexion();
List<Componente> componentes = bd.obtenerComponentesLista(seleccion);
String txt = "<componentes>";
for(int contador=0;contador<componentes.size();contador++){
txt+="<componente><nombre>"+componentes.get(contador).getNombre()+"</nombre><descripcion>"+componentes.get(contador).getDescripcion()+"</descripcion><precio>"+componentes.get(contador).getPrecio()+"</precio><foto>"+componentes.get(contador).getFoto()+"</foto></componente>";
}
txt+="</componentes>";
out.print(txt);
%>
