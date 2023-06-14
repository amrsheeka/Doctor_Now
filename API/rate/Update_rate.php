<?php
include '../Connection.php';
$doctor_id = filterRequest('doctor_id');
$id = filterRequest('id');
$rate_count =filterRequest('rate_count');
$users_id =filterRequest('users_id');
$stmt = $con->prepare("UPDATE `ratetable` SET `rate_count`=? WHERE id= ?");
$stmt->execute(array( $rate_count,  `NOW()`, $id));
$count = $stmt->rowCount();
if ($count > 0) {
    echo "success";
} else
    echo "fail";