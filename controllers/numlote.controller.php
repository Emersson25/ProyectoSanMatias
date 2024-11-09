<?php
session_start();

require_once '../models/numlote.php';

$numlote = new NumLote();

header("Content-type: application/json; charset=utf-8");

if(isset($_GET['operacion'])){
  switch($_GET['operacion']){
      case 'getAll':
          $consulta = $numlote->getAll();
          echo json_encode($consulta);
          break;
      case 'searchLote':
          echo json_encode($numlote->searchLote(['numLote' => $_GET['numLote']]));
          break;
          case 'getAllLote': // Llamada corregida para getAllLote
            $consulta = $numlote->getAllLote();
            echo json_encode($consulta);
            break;
  }
}

if(isset($_POST['operacion'])){
  switch($_POST['operacion']){
      case 'add':
          $datos = [
              "numLote"     => $numlote->limpiarCadena($_POST['numLote']),
              "CantInicio" =>$numlote->limpiarCadena($_POST['CantInicio']),
              "descripcion"   => $numlote->limpiarCadena($_POST['descripcion'])
          ];
          $idobtenido = $numlote->add($datos);
          echo json_encode(["idlote" => $idobtenido]);
          break;
  }
}

