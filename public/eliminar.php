<?php
include_once "cors.php";
include_once "conexion.php";
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

    $id = $data['id'];


$sql = "DELETE FROM citas where id_cita = '$id'";

if ($mysqli->query($sql) === TRUE) {
  $array = ['CITA ELIMINADA'];
    $response = json_encode($array);
    echo $response;
}else{
  $response = "Error: " . $sql . "<br>" . $mysqli->error;
  $response = json_encode($response);
  echo $response;
}
exit();

//  $response = json_encode($dni);
//         echo $response;
// $array = $dni." ".$password;
//
// $response = json_encode($array);
//          echo $response;
?>
