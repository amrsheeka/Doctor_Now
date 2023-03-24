<?php
include '../Connection.php';
$email = filterRequest('email');
$password = filterRequest('password');
$name = filterRequest('password');
$bio = filterRequest('bio');
$image = filterRequest('image');
$is_admin = filterRequest('is_admin');
$stmt = $con->prepare("INSERT INTO `users`( `name`, `email`, `password`,`bio`, `image`, `is_admin`, `created_at`) VALUES (?,?,?,?,?,?,?)");
$stmt->execute(array($name, $email, $password, $bio, $image, $is_admin, "NOW()"));
$count = $stmt->rowCount();
if ($count > 0) {
    echo "success";
} else
    echo "fail";
