<?php
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0, '/', '', false, true);
session_start();
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

if (!empty($_SESSION)) {
    $stmt = $con->prepare("SELECT * FROM `users` where `id`= ?");
    $stmt->execute(array($_SESSION['id']));
    $users = $stmt->fetch(PDO::FETCH_ASSOC);
    $count = $stmt->rowCount();
    if ($count > 0) {
        echo json_encode($users);
    }
}