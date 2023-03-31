<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$title = $obj['title'];
$image = $obj['image'];
$name = $obj['name'];

$title1 = $obj['title1'];
$describtion = $obj['describtion'];
$keywords = $obj['keywords'];

$charactristic = $obj['charactristic'];
$charactristic_2 = $obj['charactristic_2'];
$specialization = $obj['specialization'];

$specialization1 = $obj['specialization1'];
$specialization2 = $obj['specialization2'];
$specialization3 = $obj['specialization3'];

$address = $obj['address'];
$price = $obj['price'];
$currency = $obj['currency'];

$number = $obj['number'];
$start = $obj['start'];
$end = $obj['end'];

$day = $obj['day'];
$available = $obj['available'];
$status = $obj['status'];

$stmt = $con->prepare("INSERT INTO `doctors`(`title`, `image`, `name`, `title1`, `describtion`, `keywords`, `charactristic`, `charactristic_2`, `specialization`, `specialization1`, `specialization2`, `specialization3`, `address`, `price`, `currency`, `number`,  `start`, `end`, `day`, `available`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$stmt->execute(array($title, $image, $name, $title1, $describtion, $keywords, $charactristic, $charactristic_2, $specialization, $specialization1, $specialization2, $specialization3, $address, $price, $currency, $number, $start, $end, $day, $available, $status));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));