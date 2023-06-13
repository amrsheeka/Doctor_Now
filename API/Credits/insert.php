<?php
include "../Connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With,Content-Type");
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$Card_Number = $obj['Card_Number'];
$Holder_Name = $obj['Holder_Name'];
$CVV = $obj['CVV'];
$Card_Expiry = $obj['Card_Expiry'];
// validation
$stmt = $con->prepare("INSERT INTO `credits`(`Card_Number`, `Holder_Name`,
`CVV`,`Card_Expiry`) VALUES (?,?,?,?)");
$stmt->execute(array($Card_Number, $Holder_Name,$CVV,$Card_Expiry));
$count = $stmt->rowCount();
if ($count > 0) {
    echo json_encode(array("status" => "success"));
} else
    echo json_encode(array("status" => "fail"));
