<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$users_id = $obj['users_id'];
$doctor_id = $obj['doctor_id'];
$date = $obj['date'];
$time = $obj['time'];
$name_patient = $obj['name_patient'];
$age = $obj['age'];
$gender = $obj['gender'];
$phone_number = $obj['phone_number'];
$notes = $obj['notes'];
$patient_image = isset($obj['patient_image']) ? $$obj['patient_image'] : "";

$doc_name = $obj['doc_name'];
$doc_image = $obj['doc_image'];
$specialization1 = $obj['specialization1'];
$title1 = $obj['title1'];
$title = $obj['title'];
$price = $obj['price'];
$wating_time = $obj['wating_time'];
$address = $obj['address'];
// validation
$stmt = $con->prepare("INSERT INTO `appointment`(`users_id`, `doctor_id`,`date`,`time`,`name_patient`,`age`,`gender`, `phone_number`,`notes`,`patient_image`,`price`,`wating_time`,`title1`,`title`,doc_name,doc_image,specialization1,`address`,`date_now`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())");
$stmt->execute(array($users_id, $doctor_id, $date, $time, $name_patient, $age, $gender, $phone_number, $notes,$patient_image, $price, $wating_time, $title1 , $title ,$doc_name, $doc_image, $specialization1, $address));
$stmt1 = $con->prepare("UPDATE `doctors`set `payment_map`=`payment_map`-1 WHERE `id`=?");
$stmt1->execute(array($doctor_id));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
