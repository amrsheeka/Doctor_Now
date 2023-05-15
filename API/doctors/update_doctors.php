<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj['id'];
$title = $obj['title'];
$title1 = $obj['title1'];
$image = $obj['image'];
$name = $obj['name'];

$describtion = $obj['describtion'];
$charactristic = $obj['charactristic'];
$charactristic_2 = $obj['charactristic_2'];
$specialization = $obj['specialization'];
$specialization1 = $obj['specialization1'];

$specialization2 = $obj['specialization2'];
$specialization3 = $obj['specialization3'];
$address = $obj['address'];

$price = $obj['price'];
// $currency = $obj['currency'];
$number = $obj['number'];
$status = $obj['status'];
$schedule_type = $obj['schedule_type'];
$intervall = $obj['intervall'];
$x_coordnate = $obj['x_coordnate'];
$y_coordnate = $obj['y_coordnate'];

$stmt = $con->prepare("UPDATE `doctors` SET `title`=?,`image`=?,`name`=?,`title1`=?,
`describtion`=?,`charactristic`=?,`charactristic_2`=?,`specialization`=?,
`specialization1`=?,`specialization2`=?,`specialization3`=?,`address`=?,
`price`=?,`number`=?,`status`=?,`schedule_type`=?,`intervall`=?`x_coordnate`=?,
`y_coordnate`=? WHERE id = ?");
$stmt->execute(array($title, $image, $name, $title1,
 $describtion, $charactristic, $charactristic_2, $specialization,
  $specialization1, $specialization2, $specialization3, $address, $price,
    $number, $status,$schedule_type,$intervall, $x_coordnate, $y_coordnate, $id));
$schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "failed"));
