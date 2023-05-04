<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email = $obj['email'];
$title = $obj['title'];
$image = $obj['image'];
$name = $obj['name'];
$title1 = $obj['title1'];
$describtion = $obj['describtion'];
// $keywords = $obj['keywords'];
// $charactristic = $obj['charactristic'];
// $charactristic_2 = $obj['charactristic_2'];
// $specialization = $obj['specialization'];
$specialization1 = $obj['specialization1'];
$specialization2 = $obj['specialization2'];
// $specialization3 = $obj['specialization3'];
$address = $obj['address'];
$price = $obj['price'];
$password = $obj['password'];
// $gender = $obj['gender'];
// $age = $obj['age'];
// $phone = $obj['phone'];
// $currency = $obj['currency'];
// $number = $obj['number'];
$start = $obj['start'];
$end = $obj['end'];
// $available = $obj['available'];
// $status = $obj['status'];
$x_coordnate = $obj['x_coordnate'];
$y_coordnate = $obj['y_coordnate'];
$stmt1 = $con->prepare("INSERT INTO `users`(`email`,`name`,`password`,`address`,`image`,`is_doctor`,created_at ) VALUES (?,?,?,?,?,'yes',NOW())");
$stmt1->execute(array($email,   $name, $password, $address, $image));
$stmt = $con->prepare("INSERT INTO `doctors`(`email`,`title`, `image`, `name`, `title1`, `describtion`,   `specialization1`, `specialization2`, `address`, `price`, `start`, `end`,`x_coordnate`,`y_coordnate`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$stmt->execute(array($email, $title, $image, $name, $title1, $describtion, $specialization1, $specialization2, $address, $price, $start, $end, $x_coordnate, $y_coordnate));

$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
