<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj['id'];
$start = $obj['start'];
$end = $obj['end'];
$avilable = $obj['avilable'];
$day = $obj['day'];

$stmt = $con->prepare("UPDATE `schedule` SET `start`=?,`end`=? , `avilable`=? WHERE `id` =? ");
$stmt->execute(array($start, $end, $avilable, $id));
$schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "failed"));
