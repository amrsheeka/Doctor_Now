<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$doctor_id = $obj['doctor_id'];
$appoints = $obj['appoints'];
$Card_Number = $obj['Card_Number'];
$ammount = $obj['ammount'];
$CVV = $obj['CVV'];
$Card_Expiry = $obj['Card_Expiry'];
$stmt1 = $con->prepare("SELECT * FROM credits WHERE `Card_Number` =?");
$stmt1->execute(array($Card_Number));
$curr = $stmt1->fetchAll(PDO::FETCH_ASSOC);
$count1 = $stmt1->rowCount();
if($count1>0){
    if($curr[0]['CVV']==$CVV&&$curr[0]['Card_Expiry']==$Card_Expiry){
        if($curr[0]['money']>=$ammount){
            $stmt = $con->prepare("UPDATE `credits` SET `money`=(?-$ammount) WHERE Card_Number = ?");
            $stmt3 = $con->prepare("SELECT payment_map FROM doctors WHERE `id` =?");
            $stmt3->execute(array($doctor_id));
            $map = $stmt3->fetchAll(PDO::FETCH_ASSOC);
            $stmt2 = $con->prepare("UPDATE `doctors` SET `payment_map`=(?+$appoints) WHERE id = ?");
            $stmt2->execute(array($map[0]['payment_map'],$doctor_id));
            $stmt->execute(array($curr[0]['money'],$Card_Number));
            $schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $count = $stmt->rowCount();
            if ($count > 0) {
                echo json_encode(array("status" => "success"));
            } else
                echo json_encode(array("status" => "failed"));
        }else{
            echo json_encode(array("status" => "You don't have enough to parchase"));
        }
    }else{
        echo json_encode(array("status" => "Invalid CVV or expiry date"));
    }
}else{
    echo json_encode(array("status" => "The card is not valid"));
}


