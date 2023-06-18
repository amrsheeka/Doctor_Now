<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$users_id = $obj['users_id'];
$doctor_id = $obj['doctor_id'];
$rate_count = $obj['rate_count'];

// validation
$stmt = $con->prepare("INSERT INTO `ratetable`(`users_id`, `doctor_id`,`rate_count`) VALUES (?,?,?)");
$stmt->execute(array($users_id, $doctor_id ,$rate_count));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
