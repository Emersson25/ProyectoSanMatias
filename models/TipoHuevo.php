<?php

require_once 'Conexion.php';

class TipoHuevo extends Conexion{

  private $pdo; 

  //Constructor
  public function __CONSTRUCT(){
      $this->pdo = parent::getConexion(); 
  }

  public function getAllHuevos():array{
    return parent::getData('spu_listar_tipohuevo');
}

public function getAllTiposHuevos():array{
  return parent::getData('spu_listado_tipoHuevo');
}

public function editarTipoHuevos($params = []): bool {
  try {
      // Preparar la consulta con el procedimiento correcto
      $consulta = $this->pdo->prepare("CALL spu_editar_tipoHuevo(?, ?, ?, ?)");
      $consulta->execute(array(
          $params['idhuevo'],  
          $params['tiposHuevos'],      
          $params['PrecioKg'], 
          $params['descripcion']    
      ));
      return true; 
  } 
  catch (Exception $e) {
      die($e->getMessage()); 
  }
}
public function eliminarProducto($idproducto = 0){
  try {
    $consulta = $this->pdo->prepare("CALL spu_eliminar_tipoHuevo(?);");
    $consulta->execute(array($idproducto));
  } 
  catch (Exception $e) {
    die($e->getMessage());
  }
 }

}