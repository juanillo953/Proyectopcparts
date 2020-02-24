<%-- 
    Document   : seleccionCategoriasXML
    Created on : 24-feb-2020, 8:38:44
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Componente"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
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

String txt = "<componentes>";
for(int contador=0;contador<componentes.size();contador++){
    txt+="<componente><nombre>"+componentes.get(contador).getNombre()+"</nombre><descripcion>"+componentes.get(contador).getDescripcion()+"</descripcion><precio>"+componentes.get(contador).getPrecio()+"</precio><foto>"+componentes.get(contador).getFoto()+"</foto></componente>";
}
txt+="</componentes>";
out.print(txt);
%>

