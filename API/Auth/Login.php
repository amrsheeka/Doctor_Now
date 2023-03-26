<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
// $email = filterRequest('email');
// $password = filterRequest('password');
$email = $obj['email'];
$password = $obj['password'];

$stmt = $con->prepare("SELECT * FROM users WHERE  `password` = ? AND `email` =? ");
$stmt->execute(array($password, $email));
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array($users));
    // var_dump($users);
} else
    echo json_encode(array("status" => "failed"));
