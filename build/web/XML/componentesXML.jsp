<%-- 
    Document   : componentesXML
    Created on : 24-feb-2020, 8:28:38
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%String busqueda = request.getParameter("comp");
Bd bd = new Bd();
bd.abrirConexion();
List<Componente> componentes = bd.obtenerComponentes(busqueda);
String txt = "<componentes>";
for(int contador=0;contador<componentes.size();contador++){
    txt+="<componente><nombre>"+componentes.get(contador).getNombre()+"</nombre><descripcion>"+componentes.get(contador).getDescripcion()+"</descripcion><precio>"+componentes.get(contador).getPrecio()+"</precio><foto>"+componentes.get(contador).getFoto()+"</foto></componente>";

}
txt+="</componentes>";
out.print(txt);
%>
