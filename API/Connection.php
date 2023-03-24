<?php
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "route32_s3";

// // Create connection
// $conn = mysqli_connect($servername, $username, $password, $dbname);
// // Check connection
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// } 
// mysqli_close($conn);//لو استخدمت الكونيكشن تانى بعد السطر ده مش هعرف استخدمه


include "function.php";
$dsn = "mysql:host=localhost;dbname=doctor_now";
$user = "root";
$pass = "";
$option = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8" // FOR Arabic
);
try {

    $con = new PDO($dsn, $user, $pass, $option);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo $e->getMessage();
}
