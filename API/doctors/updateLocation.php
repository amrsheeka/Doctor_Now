<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj['id'];
$x_coordnate = $obj['x_coordnate'];
$y_coordnate = $obj['y_coordnate'];
$stmt = $con->prepare("UPDATE `doctors` SET `x_coordnate`=?,`y_coordnate`=? WHERE `id` = '$id' ");
$stmt->execute(array($x_coordnate, $y_coordnate));
$doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "failed"));