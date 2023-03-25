<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$stmt = $con->prepare("SELECT * FROM doctors ");
$stmt->execute();
$doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode($doctors);
    // var_dump($users);
} else
    echo json_encode(array("status" => "failed"));
