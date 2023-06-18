<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj['id'];
$name = $obj['name'];
$image = $obj['image'];
$email = $obj['email'];
$phone = $obj['phone'];
$address = $obj['address'];
// $address_2 = $obj['address_2'];
$gender = $obj['gender'];
$age = $obj['age'];
$password = $obj['password'];

$is_doctor = $obj['is_doctor'];
$is_admin = $obj['is_admin'];
// $phone_number_validation_regex = '/^01[0125][0-9]{8}$/';
// $phone_regex = preg_match($phone_number_validation_regex, $phone);
// if (!$phone_regex) {
//     echo json_encode(array("status" => "invalid phone number"));
// }else
if (empty($address)) {
    echo json_encode(array("status" => "please enter your address"));
}elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("status" => "invalid email"));
}else{
    $stmt = $con->prepare("UPDATE `users` SET `email`=?, `phone`=?, `name`=?, `password` = ?, `address`=?,
    `gender`=?, `age`=?, `image`= ? WHERE id= $id");
    $stmt->execute(array($email, $phone, $name, $password, $address, $gender, $age , $image));
    $count = $stmt->rowCount();
    if ($count > 0) {
        echo json_encode(array("status" => "success"));
    } else
        echo json_encode(array("status" => "failed"));
}
