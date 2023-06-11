<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$Card_Number = $obj['Card_Number'];
$ammount = $obj['ammount'];
$stmt1 = $con->prepare("SELECT `money` FROM `credits` WHERE Card_Number = $Card_Number");
$curr = $stmt1->fetchAll(PDO::FETCH_ASSOC);
$count1 = $stmt1->rowCount();
if($count1>0){
    if($curr>=$ammount){
        $stmt = $con->prepare("UPDATE `credits` SET `money`=($curr-$ammount) WHERE Card_Number = ?");
        $stmt->execute(array($Card_Number));
        $schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $count = $stmt->rowCount();
        if ($count > 0) {
            echo json_encode(array("status" => "success"));
        } else
            echo json_encode(array("status" => "failed"));
    }else{
        echo json_encode(array("status" => "failed"));
    }
}else{
    echo json_encode(array("status" => "The card is not valid"));
}


