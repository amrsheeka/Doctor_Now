<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$name = $obj['name'];
$email = $obj['email'];
$password = $obj['password'];
$phone = $obj['phone'];
$confirm = $obj['confirm'];
$address = $obj['address'];
$addres_2 = $obj['address_2'];
$gender = $obj['gender'];
$age = $obj['age'];
// validation

$lowercase = preg_match('@[a-z]@', $password);
$number    = preg_match('@[0-9]@', $password);
$phone_number_validation_regex = '/^01[0125][0-9]{8}$/';
$phone_regex = preg_match($phone_number_validation_regex, $phone);
if (!$lowercase && !$number && strlen($password) < 8) {
    echo json_encode(array("error" => "invalid password"));
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("error" => "invalid email"));
}
if (!$phone_regex) {
    echo json_encode(array("error" => "invalid phone number"));
}
if (!($confirm == $password)) {
    echo json_encode(array("error" => "invalid confirm password"));
}
if (empty($address)) {
    echo json_encode(array("error" => "please enter your address"));
}
if ($lowercase && $number && strlen($password) > 8) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if ($phone_regex) {
            if ($confirm == $password) {
                if (!empty($address)) {
                    $stmt = $con->prepare("INSERT INTO `users`(`name`,`email`, `password`,`phone`,`address`,`address_2`,`gender`,`age`,`created_at`) VALUES (?,?,?,?,?,?,?,?,NOW())");
                    $stmt->execute(array($name, $email, $password, $phone, $address, $addres_2, $gender, $age));
                    $count = $stmt->rowCount();
                    if ($count > 0) {
                        echo json_encode(array("status" => "success"));
                    } else
                        echo json_encode(array("status" => "fail"));
                }
            }
        }
    }
}
