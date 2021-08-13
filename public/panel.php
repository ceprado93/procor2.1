<?php
include_once "cors.php";
include_once "conexion.php";
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

    $dni = $data['dni'];


$sth = mysqli_query($mysqli, "SELECT * FROM citas where dni = '$dni'");
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $id= $r["id_cita"];
    $nombre = $r["nombre"];
    $apellidos = $r["apellidos"];
    $nacimiento = $r["nacimiento"];
    $phone = $r["phone"];
    $email = $r["email"];
    $dni = $r["dni"];
    $rows[] = $r;
}
echo json_encode($rows);
exit();

//  $response = json_encode($dni);
//         echo $response;
// $array = $dni." ".$password;
//
// $response = json_encode($array);
//          echo $response;
?>
