<?php
include '../Connection.php';
$id = filterRequest('id');
$stmt = $con->prepare("DELETE FROM `users` WHERE id=?");
$stmt->execute(array($id));
$count = $stmt->rowCount();
if ($count > 0) {
    echo "success";
} else
    echo "fail";
