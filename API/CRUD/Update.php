<?php
include '../Connection.php';
$id = filterRequest('id');
$email = filterRequest('email');
$password = filterRequest('password');
$name = filterRequest('password');
$bio = filterRequest('bio');
$image = filterRequest('image');
$is_admin = filterRequest('is_admin');
$stmt = $con->prepare("UPDATE `users` SET `name`=?,`email`=?,`password`=?,`bio`=?,`image`=?,`is_admin`=?,`created_at`=? WHERE id= ?");
$stmt->execute(array($name, $email, $password, $bio, $image, $is_admin, `NOW()`, $id));
$count = $stmt->rowCount();
if ($count > 0) {
    echo "success";
} else
    echo "fail";
