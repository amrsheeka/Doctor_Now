<?php
//SELECT * FROM `appointment` WHERE 1

include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email  = $obj['email'];
$stmt = $con->prepare("SELECT * FROM `doctors` WHERE  `email` = ?");
$stmt->execute(array($email));

$users_app = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode($users_app);
} else
    echo json_encode(array("status" => "failed"));
