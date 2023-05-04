<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$password = $obj['password'];
$email = $obj['email'];
$confirm = $obj['confirm'];
$old_password = $obj['old_password'];
$stmt1 = $con->prepare("SELECT `password` FROM `users` WHERE `email` =?");
$stmt1->execute(array($email));
$users = $stmt1->fetch(PDO::FETCH_ASSOC);
if ($old_password == $users['password']) {

    if ($confirm == $password) {

        $stmt = $con->prepare("UPDATE `users` SET `password`=? WHERE `email`=?");
        $stmt->execute(array($password, $email));
        $count = $stmt->rowCount();
        if ($count > 0) {
            echo json_encode(array("status" => "success"));
        } else
            echo json_encode(array("status" => "failed"));
    }
} elseif ($confirm != $password) {
    echo json_encode(array("status" => "this password not confirmed"));
} elseif ($old_password != $users['password']) {
    echo json_encode(array("status" => "wrong password"));
}
