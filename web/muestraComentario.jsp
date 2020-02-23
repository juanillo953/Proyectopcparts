<%-- 
    Document   : muestraComentario
    Created on : 23-feb-2020, 11:22:32
    Author     : Juan
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Comentario"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String comp = request.getParameter("comp");
    Bd bd = new Bd();
    bd.abrirConexion();
    List<Comentario> comentarios = bd.obtenerComentarios(comp);
    String txt = "[";
    for(int contador=0;contador<comentarios.size();contador++){
        txt+="{\"puntos\":\""+comentarios.get(contador).getPuntos()+"\",\"mensaje\":\""+comentarios.get(contador).getMensaje()+"\",\"usuario\":\""+comentarios.get(contador).getUsuario()+"\"},";
    }
    txt = txt.substring(0,txt.length()-1);
    txt+="]";
    out.print(txt);
%>
