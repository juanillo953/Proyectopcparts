<%-- 
    Document   : seleccionCategoriasJSON
    Created on : 18-feb-2020, 10:07:48
    Author     : Juan
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%  request.setCharacterEncoding("UTF-8");
    String seleccionC = request.getParameter("seleccionC");
seleccionC = seleccionC.substring(0,seleccionC.length()-1);
String seleccionM = request.getParameter("seleccionM");
List<Componente> componentes = null;
Bd bd = new Bd();
bd.abrirConexion();
if(seleccionM!=null){
seleccionM = seleccionM.substring(0,seleccionM.length()-1);
componentes = bd.obtenerComponentesCategoria(seleccionC,seleccionM);
}
else{

componentes = bd.obtenerComponentesSoloCategoria(seleccionC);
}

String txt = "[";
for(int contador=0;contador<componentes.size();contador++){
txt+="{\"nombre\":\""+componentes.get(contador).getNombre()+"\",\"descripcion\":\""+componentes.get(contador).getDescripcion()+"\",\"precio\":\""+componentes.get(contador).getPrecio()+"\",\"foto\":\""+componentes.get(contador).getFoto() +"\"},";

}
txt= txt.substring(0,txt.length()-1);
txt+="]";
out.print(txt);
%>
