<?php
include '../Connection.php';
$users_id = filterRequest('usres_id');
$doctor_id = filterRequest('doctor_id');

$name_patient = filterRequest('name_patient');
$gender = filterRequest('gender');
$notes = filterRequest('notes');

$stmt = $con->prepare("UPDATE `appointment` SET `name_patient`=?,`gender`=?,`notes`=? WHERE users_id= ? AND doctor_id=? "  );
$stmt->execute(array($name_patient,$gender,$notes));
$count = $stmt->rowCount();
if ($count > 0) {
    echo "success";
} else
    echo "fail";