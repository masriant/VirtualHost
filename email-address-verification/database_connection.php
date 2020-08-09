<?php
//database_connection.php

$connect = new PDO('mysql:host=localhost;dbname=testing', 'root', '');



// $servername = "localhost";
// $database = "testing";
// $username = "root";
// $password = "";
// try {
//   $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//   echo "Connected successfully";
// } catch (PDOException $e) {
//   echo "Connection failed: " . $e->getMessage();
// }

// $servername = "localhost";
// $username = "root";
// $password = "";
// try {
//   $conn = new PDO("mysql:host=$servername;dbname=testing", $username, $password);
//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//   echo "Connected successfully";
// } catch (PDOException $e) {
//   echo "Connection failed: " . $e->getMessage();
// }

session_start();


// <?php
// $servername = "localhost"; $database = "databasename"; $username = "username"; $password = "password";
// try {
// 	$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
// 	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// 	echo "Connected successfully";
// }
// catch(PDOException $e) {echo "Connection failed: " . $e->getMessage();}
// 