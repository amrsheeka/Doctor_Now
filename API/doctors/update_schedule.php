<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj['id'];
$start = $obj['start'];
$end = $obj['end'];
$available = $obj['avilable'];
$day = $obj['day'];

// Check if 'number' field is provided in the JSON
if (isset($obj['number'])) {
    $number = $obj['number'];
    
    $stmt = $con->prepare("UPDATE `schedule` SET `start`=?, `end`=?, `avilable`=?, `number`=? WHERE `id`=?");
    $stmt->execute(array($start, $end, $available, $number, $id));
} else {
    $stmt = $con->prepare("UPDATE `schedule` SET `start`=?, `end`=?, `avilable`=? WHERE `id`=?");
    $stmt->execute(array($start, $end, $available, $id));
}

$count = $stmt->rowCount();

if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "failed"));
}
