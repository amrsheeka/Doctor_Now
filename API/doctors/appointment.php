<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$users_id = $obj['users_id'];
$doctor_id = $obj['doctor_id'];
$date = $obj['date'];
$time = $obj['time'];
// $created_at = $obj['created_at'];
// validation
$stmt = $con->prepare("INSERT INTO `appointment`(`users_id`, `doctor_id`, `date`, `time`,`time_now`, `date_now`) VALUES (?,?,?,?,NOW(),NOW())");
$stmt->execute(array($users_id, $doctor_id, $date, $time));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
