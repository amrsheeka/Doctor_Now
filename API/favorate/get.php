<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$users_id = $obj['users_id'];
// validation
$stmt = $con->prepare("SELECT * FROM favorite WHERE `users_id`=?");
$stmt->execute(array($users_id));
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
    echo json_encode($users);
} else
    echo json_encode(array("status" => "fail"));
