<%-- 
    Document   : sacarDatosComponenteXML
    Created on : 24-feb-2020, 8:36:08
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%String nombre = request.getParameter("comp");
Bd bd = new Bd();
bd.abrirConexion();
List<Componente> componente = bd.obtenerComponentesNombre(nombre);
String txt = "<componentes>";
for(int contador=0;contador<componente.size();contador++){
    txt+="<componente><nombre>"+componente.get(contador).getNombre()+"</nombre><descripcion>"+componente.get(contador).getDescripcion()+"</descripcion><precio>"+componente.get(contador).getPrecio()+"</precio><foto>"+componente.get(contador).getFoto()+"</foto></componente>";

}

txt+="</componentes>";
out.print(txt);%>
