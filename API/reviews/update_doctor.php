<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);


$id = $obj['id']; 
$views = $obj['views'];
$rate = $obj['rate'];

var_dump($obj); 
$stmt = $con->prepare("UPDATE `doctors` SET `views` = ?,  `rate` = ? WHERE id = ? ");
$stmt->execute(array($views, $rate, $id));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "failed"));
}
?>