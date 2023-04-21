<?php
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0, '/', '', false, true);
session_start();
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

if (isset($_SESSION['id'])) {
    $stmt = $con->prepare("SELECT * FROM `users` where `id`= ?");
    $stmt->execute(array($_SESSION['id']));
    $users = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = $stmt->rowCount();
    if ($count > 0) {
        echo json_encode($users);
    }
}

$count = 0;
if (!isset($_SESSION['id']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $email = $obj['email'];
    $password = $obj['password'];
    $stmt = $con->prepare("SELECT * FROM users WHERE  `password` = ? AND `email` =? ");
    $stmt->execute(array($password, $email));
    $users = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = $stmt->rowCount();
}

if ($count > 0) {
    $_SESSION['id'] = $users['id'];
    $_SESSION['name'] = $users['name'];
    $_SESSION['email'] = $users['email'];
    $_SESSION['is_admin'] = $users['is_admin'];
    $_SESSION['is_doctor'] = $users['is_doctor'];
    $_SESSION['phone'] = $users['phone'];
    $_SESSION['address'] = $users['address'];
    $_SESSION['address_2'] = $users['address_2'];
    $_SESSION['gender'] = $users['gender'];
    $_SESSION['age'] = $users['age'];
    echo json_encode($_SESSION);
}
