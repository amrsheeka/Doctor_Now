<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$id = $obj['id'];
$Card_Number = $obj['Card_Number'];
$Holder_Name = $obj['Holder_Name'];
$CVV = $obj['CVV'];
$Card_Expiry = $obj['Card_Expiry'];

$stmt = $con->prepare("UPDATE `credits` SET `Card_Number`=?,`Holder_Name`=?,
`CVV`=?,`Card_Expiry`=? WHERE id = ?");
$stmt->execute(array($Card_Number, $Holder_Name,$CVV,$Card_Expiry,$id));
$schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "failed"));
