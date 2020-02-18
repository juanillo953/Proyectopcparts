/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import modelo.Categoria;
import modelo.Componente;
import modelo.Marca;

/**
 *
 * @author Alumno_2DAW
 */
public class Bd {
  private final static String drv = "com.mysql.jdbc.Driver";
   private final static String db = "jdbc:mysql://localhost:3306/partespc?useSSL=false";
   private final static String user = "root";
   private Connection conn;
   private PreparedStatement pst;
   private ResultSet rs; 
   
   
   public void abrirConexion() throws ClassNotFoundException, SQLException{
    Class.forName(drv);
    conn = DriverManager.getConnection(db,user,"");
       System.out.println("La conexion se realizo con exito");
   }
   public void cerrarConexion() throws SQLException{
    if(pst != null)pst.close();
    if(rs !=null)pst.close();
       System.out.println("Conexion Cerrada");
    }
   public List<Componente> obtenerComponentes(String busqueda){
       List<Componente> componentes = new ArrayList<>();
       String sql = "SELECT * FROM componente where nombre like '"+busqueda+"%'";
      try {
          pst = conn.prepareStatement(sql);
           rs = pst.executeQuery();
            while(rs.next()){
                    String nombre = rs.getString(2);
                    String descripcion = rs.getString(3);
                    float precio = rs.getFloat(4);
                    String foto = rs.getString(7);
                    Componente componente = new Componente(nombre, descripcion, precio,foto);
                    componentes.add(componente);
            }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
      return componentes;
   
   }
   public List<Marca> obtenerMarcas(){
    List<Marca> marcas = new ArrayList<>();
    String sql = "SELECT * FROM fabricante";
      try {
          pst = conn.prepareStatement(sql);
          rs = pst.executeQuery();
          while(rs.next()){
              String nombre = rs.getString(2);
              Marca marca= new Marca(nombre);
              marcas.add(marca);
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
    return marcas;
   
   
   }
      public List<Categoria> obtenerCategoria(){
    List<Categoria> categorias = new ArrayList<>();
    String sql = "SELECT * FROM categoria";
      try {
          pst = conn.prepareStatement(sql);
          rs = pst.executeQuery();
          while(rs.next()){
              String nombre = rs.getString(2);
              Categoria categoria= new Categoria(nombre);
              categorias.add(categoria);
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
    return categorias;
   
   
   }
      public List<Componente> obtenerComponentesLista(String seleccion){
          List<Componente> componentes = new ArrayList<>();
          List<Integer> marcas = new ArrayList<>();
          String sql ="SELECT * FROM fabricante where nombre in("+seleccion+")";
      try {
          pst = conn.prepareStatement(sql);
          rs = pst.executeQuery();
          while(rs.next()){
              marcas.add(rs.getInt(1));
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
      String numeros="";
      for(int contador=0;contador<marcas.size();contador++){
          numeros+=marcas.get(contador)+",";
      }
      numeros=numeros.substring(0,numeros.length()-1);
        String sql2 = "SELECT * FROM componente where id_fabricante in ("+numeros+")";
      try {
          pst = conn.prepareStatement(sql2);
          rs = pst.executeQuery();
          while(rs.next()){
              String nombre = rs.getString(2);
              String descripcion = rs.getString(3);
              float precio = rs.getFloat(4);
              String foto = rs.getString(7);
              Componente componente = new Componente(nombre, descripcion, precio,foto);
              componentes.add(componente);
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
        
      return componentes;
      }
    public List<Componente> obtenerComponentesCategoria(String seleccionC, String seleccionM){
          List<Componente> componentes = new ArrayList<>();
          List<Integer> marcas = new ArrayList<>();
          List<Integer> categorias = new ArrayList<>();
          String sql ="SELECT * FROM fabricante where nombre in("+seleccionM+")";
      try {
          pst = conn.prepareStatement(sql);
          rs = pst.executeQuery();
          while(rs.next()){
              marcas.add(rs.getInt(1));
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
      String numeros="";
      for(int contador=0;contador<marcas.size();contador++){
          numeros+=marcas.get(contador)+",";
      }
      numeros=numeros.substring(0,numeros.length()-1);
      
        String sql2 ="SELECT * FROM categoria where nombre in("+seleccionC+")";
       try {
          pst = conn.prepareStatement(sql2);
          rs = pst.executeQuery();
          while(rs.next()){
              categorias.add(rs.getInt(1));
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
       String numeros2="";
       for(int contador2=0;contador2<categorias.size();contador2++){
         numeros2+=categorias.get(contador2)+",";  
       }
       numeros2=numeros2.substring(0,numeros2.length()-1);
        String sql3 = "SELECT * FROM componente where id_fabricante in ("+numeros+") and id_categoria in ("+numeros2+")";
      try {
          pst = conn.prepareStatement(sql3);
          rs = pst.executeQuery();
          while(rs.next()){
              String nombre = rs.getString(2);
              String descripcion = rs.getString(3);
              float precio = rs.getFloat(4);
              String foto = rs.getString(7);
              Componente componente = new Componente(nombre, descripcion, precio,foto);
              componentes.add(componente);
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
        
      return componentes;
      }
    public List<Componente> obtenerComponentesSoloCategoria(String seleccionC){
          List<Componente> componentes = new ArrayList<>();
          List<Integer> categorias = new ArrayList<>();
          String sql ="SELECT * FROM categoria where nombre in("+seleccionC+")";
      try {
          pst = conn.prepareStatement(sql);
          rs = pst.executeQuery();
          while(rs.next()){
              categorias.add(rs.getInt(1));
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
      String numeros="";
      for(int contador=0;contador<categorias.size();contador++){
          numeros+=categorias.get(contador)+",";
      }
      numeros=numeros.substring(0,numeros.length()-1);
        String sql2 = "SELECT * FROM componente where id_categoria in ("+numeros+")";
      try {
          pst = conn.prepareStatement(sql2);
          rs = pst.executeQuery();
          while(rs.next()){
              String nombre = rs.getString(2);
              String descripcion = rs.getString(3);
              float precio = rs.getFloat(4);
              String foto = rs.getString(7);
              Componente componente = new Componente(nombre, descripcion, precio,foto);
              componentes.add(componente);
          }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
        
      return componentes;
      }
    public List<Categoria> obtenerCategoriasMarca(String seleccion){
          List<Componente> componentes = new ArrayList<>();
          List<Integer> marcas = new ArrayList<>();
          List<Integer> categorias = new ArrayList<>();
          String sql ="SELECT * FROM fabricante where nombre in("+seleccion+")";
            try {
                pst = conn.prepareStatement(sql);
                rs = pst.executeQuery();
                while(rs.next()){
                    marcas.add(rs.getInt(1));
                }
            } catch (SQLException ex) {
                Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
            }
            String numeros="";
            for(int contador=0;contador<marcas.size();contador++){
                numeros+=marcas.get(contador)+",";
            }
            numeros=numeros.substring(0,numeros.length()-1);
              String sql2 = "SELECT * FROM componente where id_fabricante in ("+numeros+")";
            try {
                pst = conn.prepareStatement(sql2);
                rs = pst.executeQuery();
                while(rs.next()){
                    categorias.add(rs.getInt(5));
                }
            } catch (SQLException ex) {
                Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
            }
            String numeros2="";
             for(int contador2=0;contador2<categorias.size();contador2++){
               numeros2+=categorias.get(contador2)+",";  
             }
              numeros2=numeros2.substring(0,numeros2.length()-1);
                List<Categoria> categoriasList = new ArrayList<>();
                  String sql3 = "SELECT * FROM categoria where id in ("+numeros2+")";
              try {
                  pst = conn.prepareStatement(sql3);
                  rs = pst.executeQuery();
                  while(rs.next()){
                      String nombre = rs.getString(2);
                      Categoria categoria= new Categoria(nombre);
                      categoriasList.add(categoria);
                  }
              } catch (SQLException ex) {
                  Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
              }

            return categoriasList;
      }
     public List<Componente> obtenerComponentesNombre(String nombre){
       List<Componente> componentes = new ArrayList<>();
       String sql = "SELECT * FROM componente where nombre like '"+nombre+"'";
      try {
          pst = conn.prepareStatement(sql);
           rs = pst.executeQuery();
            while(rs.next()){
                    String descripcion = rs.getString(3);
                    float precio = rs.getFloat(4);
                    String foto = rs.getString(7);
                    Componente componente = new Componente(nombre, descripcion, precio,foto);
                    componentes.add(componente);
            }
      } catch (SQLException ex) {
          Logger.getLogger(Bd.class.getName()).log(Level.SEVERE, null, ex);
      }
      return componentes;
   
   }
}
