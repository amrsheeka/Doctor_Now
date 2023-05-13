<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$users_id = $obj['users_id'];
$doctor_id = $obj['doctor_id'];
$text = $obj['text'];
$user_name = $obj['user_name'];

// validation
$stmt = $con->prepare("INSERT INTO `reviews`(`users_id`, `doctor_id`,`text`,`user_name`) VALUES (?,?,?,?)");
$stmt->execute(array($users_id, $doctor_id ,$text ,$user_name));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
