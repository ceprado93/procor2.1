<?php
include_once "cors.php";
include_once "conexion.php";
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

    $user = $data['user'];
    $password = $data['password'];

 $sql = ("SELECT * FROM login where username = '$user' and password = '$password'");
 $result =mysqli_query($mysqli,$sql) ;
 $userData = array();

 if(mysqli_num_rows($result) == 1) {
      $_SESSION['login_user'] = $user;

   //  $response = $resultado->fetch_all(MYSQLI_ASSOC);
   $response = json_encode($user);
   echo $response;
 }else {
   $array = "HA OCURRIDO UN ERROR";
   $response = json_encode($array);
            echo $response;
 }
//  $response = json_encode($dni);
//         echo $response;
// $array = $dni." ".$password;
//
// $response = json_encode($array);
//          echo $response;
?>
