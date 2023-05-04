<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');

$obj = json_decode($json, true);
$doctor_id = $obj['doctor_id'];
$stmt = $con->prepare("SELECT * FROM  schedule where doctor_id = ? ");
$stmt->execute(array($doctor_id));
$doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode($doctors);
} else
    echo json_encode(array("status" => "failed"));
