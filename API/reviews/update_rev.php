<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$users_id = $obj['users_id'];
$doctor_id = $obj['doctor_id']; 
$user_name = $obj['user_name'];
$text = $obj['text'];
$rate = $obj['rate'];
$date = $obj['date'];

$stmt = $con->prepare("UPDATE `reviews` SET `user_name` = ?, `text` = ?, `rate` = ?, `date` = ?  WHERE users_id = ? AND doctor_id = ?");
$stmt->execute(array($user_name, $text, $rate, $date, $users_id, $doctor_id));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "failed"));
}
?>