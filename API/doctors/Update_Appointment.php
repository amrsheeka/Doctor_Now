<?php
// include '../Connection.php';
// $users_id = filterRequest('usres_id');
// $doctor_id = filterRequest('doctor_id');
// $name_patient = filterRequest('name_patient');
// $gender = filterRequest('gender');
// $notes = filterRequest('notes');
// $stmt = $con->prepare("UPDATE `appointment` SET `name_patient`=?,`gender`=?,`notes`=? WHERE users_id= ? AND doctor_id=? ");
// $stmt->execute(array($name_patient, $gender, $notes));
// $count = $stmt->rowCount();
// if ($count > 0) {
//     echo "success";
// } else
//     echo "fail";
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$users_id = $obj['users_id'];
$doctor_id = $obj['doctor_id'];
$name_patient = $obj['name_patient'];
$gender = $obj['gender'];
$notes = $obj['notes'];
$date = $obj['date'];
$time = $obj['time'];

$stmt = $con->prepare("UPDATE `appointment` SET `name_patient`=?,`gender`=?,`notes`=? , `date`=?,`time`=?  WHERE users_id= ? AND doctor_id=? ");
$stmt->execute(array($name_patient, $gender, $notes, $date, $time, $users_id, $doctor_id));
$user = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt1 = $con->prepare("SELECT * FROM appointment WHERE  `users_id` = ? AND `doctor_id` =? ");
$stmt1->execute(array($users_id, $doctor_id));
$users = $stmt1->fetch(PDO::FETCH_ASSOC);
if (!isset($name_patient)) {
    $name_patient = $users['name_patient'];
}
if (!isset($gender)) {
    $gender = $users['gender'];
}
if (empty($notes)) {
    $notes = $users['notes'];
}
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "failed"));
