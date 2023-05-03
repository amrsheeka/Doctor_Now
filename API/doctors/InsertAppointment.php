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
$notes = $obj['notes'];
$doc_name = $obj['doc_name'];
$doc_image = $obj['doc_image'];
$specialization1 = $obj['specialization1'];
// validation
$stmt = $con->prepare("INSERT INTO `appointment`(`users_id`, `doctor_id`,`date`,`time`,`name_patient`,`age`,`gender`,`notes`,doc_name,doc_image,specialization1,`date_now`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())");
$stmt->execute(array($users_id, $doctor_id, $date, $time, $name_patient, $age, $gender, $notes, $doc_name, $doc_image, $specialization1));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
