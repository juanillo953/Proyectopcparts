
<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%String busqueda = request.getParameter("comp");
Bd bd = new Bd();
bd.abrirConexion();
List<Componente> componentes = bd.obtenerComponentes(busqueda);
String txt = "[";
for(int contador=0;contador<componentes.size();contador++){
txt+="{\"nombre\":\""+componentes.get(contador).getNombre()+"\",\"descripcion\":\""+componentes.get(contador).getDescripcion()+"\",\"precio\":\""+componentes.get(contador).getPrecio()+"\",\"foto\":\""+componentes.get(contador).getFoto() +"\"},";

}
txt= txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);
%>