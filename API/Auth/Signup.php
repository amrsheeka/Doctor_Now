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
// validation
$uppercase = preg_match('@[A-Z]@', $password);
$lowercase = preg_match('@[a-z]@', $password);
$number    = preg_match('@[0-9]@', $password);

if ($uppercase && $lowercase && $number && strlen($password) > 8) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $stmt = $con->prepare("INSERT INTO `users`(`name`,`email`, `password`) VALUES (?,?,?)");
        $stmt->execute(array($name, $email, $password));
        $count = $stmt->rowCount();
        if ($count > 0) {
            echo json_encode(array("status" => "success"));
        } else
            echo json_encode(array("status" => "fail"));
    }
}
