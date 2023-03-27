<?php
session_start();
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
$users = $stmt->fetch(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {

    $_SESSION['id'] = $users['id'];
    $_SESSION['name'] = $users['name'];
    $_SESSION['email'] = $users['email'];
    // $user_data = array(
    //     'id' => $_SESSION['id'],
    //     'email' => $_SESSION['email'],
    //     'name' => $_SESSION['name'],
    // );
    // var_dump($users);
    echo json_encode($_SESSION);
} else
    echo json_encode(array("status" => "failed"));
