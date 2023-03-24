<?php
include '../Connection.php';
// $query = "SELECT *FROM users";
// $result = mysqli_query($conn, $query);
// if (mysqli_num_rows($result) > 0) {
//     // output data of each row
//     while ($row = mysqli_fetch_assoc($result)) { //بتحول الصف الى جى من الداتا بيز ل اسوشيتف اراى
//         // rerturn data
//         echo $row['id'] . "   " . $row['name'] . "   " . $row['email'] . "   " . $row['bio'] . "   " . $row['image'] . "   " . $row['is_admin'] . "   " . $row['created_at'];
//         echo "<br>";
//     }
// } else {
//     echo "0 results";
// }
$stmt = $con->prepare("SELECT * FROM users");
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
$count = $stmt->rowCount(); // return how mant rows exists
if ($count > 0) {
    echo json_encode($users);
} else
    echo json_encode(array("status" => "fail"));




// mysqli_close($conn);//لو استخدمت الكونيكشن تانى بعد السطر ده مش هعرف استخدمه