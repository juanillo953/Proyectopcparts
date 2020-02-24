<%-- 
    Document   : muestraComentarioXML
    Created on : 24-feb-2020, 8:32:34
    Author     : Alumno_2DAW
--%>

<%@page import="java.util.List"%>
<%@page import="modelo.Comentario"%>
<%@page import="controlador.Bd"%>
<%@page contentType="text/XML" pageEncoding="UTF-8"%>
<%
    String comp = request.getParameter("comp");
    Bd bd = new Bd();
    bd.abrirConexion();
    List<Comentario> comentarios = bd.obtenerComentarios(comp);
    String txt = "<comentarios>";
    for(int contador=0;contador<comentarios.size();contador++){
        txt+="<comentario><puntos>"+comentarios.get(contador).getPuntos()+"</puntos><mensaje>"+comentarios.get(contador).getMensaje()+"</mensaje><usuario>"+comentarios.get(contador).getUsuario()+"</usuario></comentario>";
    }

    txt+="</comentarios>";
    out.print(txt);
%>
